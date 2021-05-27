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
import { getCrossingData } from "redux/actions/crossingActions";

// Components
import TopicCard from "components serenity/Topic/TopicCard";
import Stages from "components serenity/Crossing/Stages";
import CrossingInfo from "components serenity/Crossing/CrossingInfo";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomTabs from 'components/CustomTabs/CustomTabs';

// @material-ui/core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ShareIcon from '@material-ui/icons/Share';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Timeline from 'components/Timeline/Timeline';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown';

const CrossingPage = () => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const { crossingId } = useParams();
    const { credentials } = useSelector((state) => state.user);
    const { crossing, topic, viewTopic, editTopic, deleteTopic } = useSelector((state) => state.crossing);

    useEffect(() => {
        dispatch(getCrossingData(crossingId));
        return () => {
            dispatch({ type: Actions.UI.CLEAR_ACTION })
        };
    }, []);

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
        }
    };

    const handleCloseTopic = () => {
        dispatch({ type: Actions.CROSSING.STOP_VIEW_TOPIC });
    }

    return (
        <GridContainer>
        {
            crossing && (
                <>
                {
                    viewTopic && topic && <TopicCard open={viewTopic} handleClose={handleCloseTopic} />
                }    
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
                        }]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
