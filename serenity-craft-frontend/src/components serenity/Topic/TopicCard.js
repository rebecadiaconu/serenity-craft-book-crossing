import React, { useEffect, forwardRef, useRef, createRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addReply, deleteReply } from "redux/actions/crossingActions";

// Components
import Button from "components/CustomButtons/Button";
import ReplyCard from "components serenity/Topic/ReplyCard";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// @material-ui core
import { makeStyles } from "@material-ui/core/styles"; 
import { Divider, Typography, TextField } from "@material-ui/core";

// @material-ui icons
import PostAddIcon from '@material-ui/icons/PostAdd';

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
    const { errors } = useSelector((state) => state.ui);

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
