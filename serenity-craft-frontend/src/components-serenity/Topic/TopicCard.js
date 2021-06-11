import React, { useEffect, forwardRef, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { reportOnBookReviewTopicReply } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addReply, deleteReply } from "redux/actions/crossingActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import CardHeader from "components-template/Card/CardHeader.js";
import CardAvatar from "components-template/Card/CardAvatar.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import ReportForm from "util/components/ReportForm";
import ReplyCard from "components-serenity/Reply/ReplyCard";

// @material-ui core
import { 
    Dialog,
    Divider, 
    makeStyles, 
    Slide,
    Typography, 
    Tooltip } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

// icons
import ReportIcon from '@material-ui/icons/Report';

// Styles
import topicStyle from "assets/jss/serenity-craft/components/topicStyle";
const useStyles = makeStyles(topicStyle);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const TopicCard = ({ open, handleClose }) => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { crossingId } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const { credentials } = useSelector((state) => state.user);
    const { topic, addedReply } = useSelector((state) => state.crossing);
    const { errors, reportOnTopic } = useSelector((state) => state.ui);

    const bottom = useRef(null);

    useEffect(() => {
        if(addedReply) {
            if (addedReply?.replyId !== topic.replyData[topic.replyData.length - 1].replyId) {
                topic.replyData.push(addedReply);
                topic.replies.push(addedReply.replyId);
            }
        }
        if (bottom.current)  bottom.current.scrollTo({ top: bottom.current.scrollHeight, behavior: 'smooth' });
    }, [addedReply]);

    const handleDeleteReply = (replyId) => {
        topic.replyData = topic.replyData.filter((reply) => reply.replyId !== replyId);
        let index = topic.replies.indexOf(replyId);
        topic.replies.splice(index, 1);
        dispatch(deleteReply(topic.topicId, replyId));
    };

    const handleAddReply = (formData) => {
        let newFormData = {
            ...formData,
            crossingId: crossingId
        }
        setValue('body', '');
        dispatch(addReply(newFormData, topic.topicId));
    };

    return (
        <Dialog
            id="bottomTopic"
            fullWidth={true}
            size="md"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            className={classes.root}
        >
            <Card className={classes.card} >
                {
                    reportOnTopic && 
                    <ReportForm 
                        open={reportOnTopic}
                        items={reportOnBookReviewTopicReply}
                        type="topic"
                        username={topic.username}
                        userImage={topic.userImage}
                        topic={topic}
                        crossingId={crossingId}
                    />
                }
                {
                    topic.username !== credentials.username && (
                        <Tooltip
                            id="tooltip-top"
                            title="REPORT"
                            placement="bottom"
                        >
                            <Button color="danger" round simple justIcon onClick={() => dispatch({ type: Actions.UI.REPORT_TOPIC })} style={{position: 'absolute', right: 10, top: -10}}>
                                <ReportIcon />
                            </Button>
                        </Tooltip>
                    )
                }
                <CardHeader color={credentials.username === topic.username ? "warning" : "info"}>
                <GridContainer>
                        <GridItem xs={4} sm={4} md={4} style={{textAlign: "center"}}>
                            <CardAvatar testimonial style={{width: 70, height: 70}}>
                                <img src={topic.userImage} />
                            </CardAvatar>
                            <Typography variant="h6" className={classes.user}>{topic.username}</Typography>
                        </GridItem>
                        <GridItem xs={8} sm={8} md={8}>
                            <Typography variant="body1">{topic.title}</Typography>
                            <Typography variant="caption">{dayjs(topic.createdAt).fromNow()}</Typography>
                        </GridItem>
                </GridContainer>
                </CardHeader>
                <CardBody>
                    <Typography variant="body1" className={classes.user}>{topic.body}</Typography>
                <Divider style={{margin: '15px 0 20px'}} />
                <div style={{maxHeight: 500, overflowX: 'hidden'}} ref={bottom}>
                {
                    topic.replyData.map((reply, index) => {
                        return (
                            <ReplyCard key={index} reply={reply} classes={classes} handleDelete={handleDeleteReply} />
                        );
                    })
                } 
                </div>
                               
                <Divider style={{margin: '15px 0 20px'}} />
                <GridContainer
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    className={classes.addReply}
                >
                    <GridItem xs={10} sm={10} md={10}>
                        <TextField 
                            required
                            className={classes.textField} 
                            variant="outlined"
                            name="body" 
                            type="text" 
                            fullWidth
                            label="Your reply" 
                            error={errors?.body ? true : false}
                            helperText={errors?.body}
                            inputRef={register()}
                            InputLabelProps={{ shrink: true }}  
                        />
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                        <Button 
                            fullWidth
                            color={credentials.username === topic.username ? "info" : "warning"}
                            onClick={handleSubmit(handleAddReply)}
                            className={classes.submitButton}
                        >
                            ADD
                        </Button>
                    </GridItem>
                </GridContainer>
                </CardBody>                 
            </Card>
        </Dialog>
    );
}

export default TopicCard;
