import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import history from "util/history";
import { crossingStages } from "util/general";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "redux/types";
import { getCrossingData, changeCrossingType, cancelCrossing, deleteCrossing, deleteTopic } from "redux/actions/crossingActions";

// Components
import ChangeBookModal from "components serenity/Crossing/ChangeBookModal";
import AddTopic from "components serenity/Topic/AddTopic";
import EditTopic from "components serenity/Topic/EditTopic";
import Button from "components/CustomButtons/Button";
import TopicCard from "components serenity/Topic/TopicCard";
import Stages from "components serenity/Crossing/Stages";
import CrossingInfo from "components serenity/Crossing/CrossingInfo";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomTabs from 'components/CustomTabs/CustomTabs';

// @material-ui/core
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Tooltip, Typography } from '@material-ui/core';

// @material-ui/icons
import SettingsIcon from '@material-ui/icons/Settings';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ShareIcon from '@material-ui/icons/Share';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Timeline from 'components/Timeline/Timeline';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useAlert = makeStyles(alertStyles);
const switchStyles = makeStyles(styles);


const CrossingPage = () => {
    dayjs.extend(relativeTime);
    const switchClasses = switchStyles();
    const alertClasses = useAlert();
    const dispatch = useDispatch();
    const { crossingId } = useParams();
    const { credentials } = useSelector((state) => state.user);
    const { crossing, cancel, deleteCross, changeBook, topicId, topic, viewTopic, addTopic, editTopic, deleteTopicVar } = useSelector((state) => state.crossing);
    const { message, errors } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);


    useEffect(() => {
        dispatch(getCrossingData(crossingId));
        return () => {
            dispatch({ type: Actions.UI.CLEAR_ACTION })
        };
    }, []);

    useEffect(() => {
        if (message) {
            successAlert(message);
            dispatch({ type: Actions.UI.CLEAR_ACTION })
        }
    }, [message]);

    useEffect(() => {
        if (errors?.error) {
            errorAlert(errors.error);
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        } 
    }, [errors]);

    useEffect(() => {
        if (deleteTopicVar && topic && topicId) confirmDelete();
        else if (cancel || deleteCross) confirmDelete();
    }, [deleteTopicVar, cancel, deleteCross]);

    const handleCancel = () => {
        dispatch(cancelCrossing(crossingId, false));
    };

    const handleDelete = () => {
        dispatch(deleteCrossing(crossingId));
    };

    const handleChangeType = () => {
        dispatch(changeCrossingType(crossingId));
    };

    const handleTopicClick = (data) => {
        switch(data.text) {
            case "VIEW":
                dispatch({ type: Actions.CROSSING.VIEW_TOPIC, payload: data.data });
                break
            case "EDIT":
                dispatch({ type: Actions.CROSSING.EDIT_TOPIC, payload: data.data });
                break
            case "DELETE":
                dispatch({ type: Actions.CROSSING.DELETE_TOPIC, payload: data.data });
                break
            default:
                break
        }
    };

    const handleCloseTopic = () => {
        dispatch({ type: Actions.CROSSING.STOP_VIEW_TOPIC });
    };

    const handleAddTopic = () => {
        dispatch({ type: Actions.CROSSING.ADD_TOPIC });
    };

    const handleDeleteTopic = () => {
        dispatch(deleteTopic(topicId, crossingId));
    };

    const hideAlert = () => {
        setAlert(null);
        if (deleteTopicVar) {
            dispatch({ type: Actions.CROSSING.STOP_DELETE_TOPIC });
        }
        else if (cancel) {
            dispatch({ type: Actions.CROSSING.STOP_CANCEL });
        } 
        else if (deleteCross) {
            dispatch({ type: Actions.CROSSING.STOP_DELETE_CROSSING });
        }
    };

    const successAlert = (text) => {
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Done!"
                onConfirm={() => {
                    setAlert(null);
                    if (deleteTopicVar) {
                        dispatch({ type: Actions.CROSSING.STOP_DELETE_TOPIC });
                    }
                    else if (cancel) {
                        dispatch({ type: Actions.CROSSING.STOP_CANCEL });
                    } 
                    else if (changeBook) {
                        dispatch({ type: Actions.CROSSING.STOP_CHANGE_BOOK });
                    }
                    else if (deleteCross) {
                        dispatch({ type: Actions.CROSSING.STOP_DELETE_CROSSING });
                        history.push('/admin/user');
                    }
                }}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {text}
            </SweetAlert>
        );
    };

    const errorAlert = (error) => {
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Error"
                onConfirm={() => {
                    setAlert(null);
                    if (deleteTopicVar) {
                        dispatch({ type: Actions.CROSSING.STOP_DELETE_TOPIC });
                    }
                    else if (cancel) {
                        dispatch({ type: Actions.CROSSING.STOP_CANCEL });
                    }
                    else if (changeBook) {
                        dispatch({ type: Actions.CROSSING.STOP_CHANGE_BOOK });
                    }
                    else if (deleteCross) {
                        dispatch({ type: Actions.CROSSING.STOP_DELETE_CROSSING });
                    }
                }}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {error}
            </SweetAlert>
        );
    };

    const confirmDelete = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => deleteTopicVar ? handleDeleteTopic() : (cancel ? handleCancel() : handleDelete())}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
                cancelBtnCssClass={alertClasses.button + " " + alertClasses.danger}
                confirmBtnText={cancel ? "Yes, cancel it!" : "Yes, delete it!"}
                cancelBtnText="Cancel"
                showCancel
            >
               {
                   cancel ? "You will not be able to invert it!" : "You will not be able to recover this data!"
               } 
            </SweetAlert>
        );
    };


    return (
        <GridContainer>
        {
            crossing && (
                <>
                {alert}
                {
                    viewTopic && topic && <TopicCard open={viewTopic} handleClose={handleCloseTopic} />
                }    
                {
                    addTopic && <AddTopic open={addTopic} />
                }
                {
                    editTopic && <EditTopic open={editTopic} />
                }
                {
                    changeBook && <ChangeBookModal open={changeBook} recipient={crossing.sender} />
                }
                <GridItem xs={12} sm={12} md={12} style={{position: 'relative'}}>
                {
                    crossing.status === "done" ? 
                    <Button color="danger" style={{display: 'flex', margin: '0 auto'}} onClick={() => dispatch({ type: Actions.CROSSING.DELETE_CROSSING })} >DELETE CROSSING</Button> : (
                        (!!crossing?.canceled) ? 
                        <Button disabled={crossing.canceled} color="danger" style={{display: 'flex', margin: '0 auto'}} >{`CANCELED BY ${crossing.canceledBy === credentials.username ? "You" : crossing.canceledBy}`}</Button> :
                        <Button color="danger" style={{display: 'flex', margin: '0 auto'}} onClick={() => dispatch({ type: Actions.CROSSING.CANCEL })} >CANCEL CROSSING</Button>
                    )
                }
                {
                    crossing.canceled && (
                        <Tooltip title="DELETE CROSSING">
                            <Button size="lg" justIcon round color="danger" simple style={{position: 'absolute', right: 10, top: -10}} onClick={() => dispatch({ type: Actions.CROSSING.DELETE_CROSSING })} ><HighlightOffIcon /></Button>
                        </Tooltip>
                    )
                }
                </GridItem>
                <CrossingInfo />
                <GridItem xs={12} sm={12} md={5}>
                    <CustomTabs
                        headerColor="rose"
                        tabs={[{
                            tabName: "Crossing stages",
                            tabIcon: ShareIcon,
                            tabContent: (
                                <Stages
                                    checkedIndexes={
                                        credentials.username === crossing.sender ? 
                                        Object.entries(crossing.senderProgress).map((stage) => {
                                            if (stage[1] === true) {
                                                if (stage[0] === "sendBook") return 0;
                                                if (stage[0] === "receiveBook") return 1;
                                                if (stage[0] === "sendBack") return 2;
                                                if (stage[0] === "getBookBack") return 3;
                                            } else return false;
                                        }).filter((index) => index !== false) :
                                        Object.entries(crossing.recipientProgress).map((stage) => {
                                            if (stage[1] === true) {
                                                if (stage[0] === "sendBook") return 0;
                                                if (stage[0] === "receiveBook") return 1;
                                                if (stage[0] === "sendBack") return 2;
                                                if (stage[0] === "getBookBack") return 3;
                                            } else return false;
                                        }).filter((index) => index !== false)
                                    }
                                    tasksIndexes={crossing.type === "temporar" ? [0, 1, 2, 3] : [0, 1]}
                                    tasks={crossing.type === "temporar" ? crossingStages : crossingStages.slice(1)}
                                />
                            )
                        },
                        {
                            tabName: "IMPORTANT",
                            tabIcon: InfoIcon,
                            tabContent: (
                                <List>
                                    <h4>Hi there! Here are some important informations that will help you improve your crossing experience!</h4>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <p>If you are the one who accepted this crossing, you already know that you're book is randomly chosen for you. You can change it until the other user send you his book. Let them know first!</p>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <p>To keep on track the crossing progress, once you've been checked one stage, it will remain checked. So don't be handy!</p>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            )
                        },
                        {
                            tabName: "SETTINGS",
                            tabIcon: SettingsIcon,
                            tabContent: (
                                <List>
                                    <Typography variant="body2">If you and your crossing mate want to keep each others books at the "end of the day", you can change your crossing type and make it permanent.</Typography>
                                    <Typography variant="body2">All you'll have to do is switching ON the button right below, but be carefull - the changes are also permanent!</Typography>
                                    <h3>Talk to each other first!</h3>
                                    <ListItem>
                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                <Switch 
                                                    checked={crossing.type === "permanent" || (crossing.sender === credentials.username ? crossing.senderPermanent : crossing.recipientPermanent)} 
                                                    disabled={crossing.type === "permanent"} 
                                                    value="permanent"
                                                    onChange={handleChangeType}
                                                    classes={{
                                                        switchBase: switchClasses.switchBase,
                                                        checked: switchClasses.switchChecked,
                                                        thumb: switchClasses.switchIcon,
                                                        track: switchClasses.switchBar
                                                    }}
                                                />}
                                                label="Make it permanent!"
                                            />
                                        </FormControl>
                                    </ListItem>
                                </List>
                            )
                        }]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Button round color="rose" onClick={handleAddTopic} style={{display: 'flex', margin: '0 auto'}}><PostAddIcon />NEW TOPIC</Button>
                    <Timeline 
                        stories={
                            crossing.topics.map((topic) => {
                                let topicData = {
                                    inverted: credentials.username === topic.username,
                                    badgeColor: credentials.username === topic.username ? "warning" : "info",
                                    badgeIcon: EmojiObjectsIcon,
                                    title: topic.title,
                                    titleColor:  credentials.username === topic.username ? "warning" : "info",
                                    body: (
                                        <p>
                                            {topic.body}
                                        </p>
                                    ),
                                    footerTitle: dayjs(topic.createdAt).fromNow(),
                                    footer: <CustomDropdown 
                                        hoverColor={credentials.username === topic.username ? "warning" : "info"}
                                        buttonText="More"
                                        buttonProps={{
                                            round: true,
                                            style: { marginBottom: "0" },
                                            color: credentials.username === topic.username ? "warning" : "info"
                                        }}
                                        dropdownList={credentials.username === topic.username ? [
                                            {
                                                text: "VIEW",
                                                data: topic
                                            },
                                            {
                                                text: "EDIT",
                                                data: topic
                                            },
                                            {
                                                text: "DELETE",
                                                data: topic
                                            }
                                        ] : [{
                                                text: "VIEW",
                                                data: topic
                                        }]}
                                        onClick={handleTopicClick}
                                    />
                                };
                                return topicData;
                            })
                        }
                    />
                </GridItem>
                </>
            )
        }
            
        </GridContainer>
    )
}

export default CrossingPage;
