import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import Card from 'components/Card/Card';
import CardAvatar from 'components/Card/CardAvatar';
import CardBody from "components/Card/CardBody.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import { makeStyles, Typography } from '@material-ui/core';

// @material-ui icons
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';

// Styles
import topicStyles from "assets/jss/serenity-craft/components/topicStyle";
import bookStyles from "assets/jss/serenity-craft/components/bookStyle";

const useTopic = makeStyles(topicStyles);
const useBook = makeStyles(bookStyles);

const ReportOnReplyTopicReview = ({ topic, reply, review }) => {
    const classesTopic = useTopic();
    const classesBook = useBook();
    dayjs.extend(relativeTime);

    return (
        <div>
         {
            review && (
                <Card>
                <GridContainer
                    justify="flex-start"
                    alignContent="flex-start"
                    alignItems="flex-start"
                    className={classesBook.review}
                >
                    <GridItem xs={4} sm={4} md={2}>
                        <CardAvatar>
                            <img src={review.userImage} style={{objectFit: 'cover', width: 130, height: 130}} />
                        </CardAvatar>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={9} className={classesBook.left}>
                        <Typography variant="subtitle1" style={{fontFamily: "'Grandstander', cursive"}}>
                            {review.username} 
                        </Typography>
                        <div>
                            {review.rating < 1 ? (review.rating < 0.5 ? <GradeOutlinedIcon className={classesBook.ratingIcon} /> : <StarHalfIcon className={classesBook.ratingIcon} />) : <GradeIcon className={classesBook.ratingIcon} />}  
                            {review.rating < 2 ? (review.rating < 1.5 ? <GradeOutlinedIcon className={classesBook.ratingIcon} /> : <StarHalfIcon className={classesBook.ratingIcon} />) : <GradeIcon className={classesBook.ratingIcon} />}  
                            {review.rating < 3 ? (review.rating < 2.5 ? <GradeOutlinedIcon className={classesBook.ratingIcon} /> : <StarHalfIcon className={classesBook.ratingIcon} />) : <GradeIcon className={classesBook.ratingIcon} />}  
                            {review.rating < 4 ? (review.rating < 3.5 ? <GradeOutlinedIcon className={classesBook.ratingIcon} /> : <StarHalfIcon className={classesBook.ratingIcon} />) : <GradeIcon className={classesBook.ratingIcon} />}  
                            {review.rating < 5 ? (review.rating < 4.5 ? <GradeOutlinedIcon className={classesBook.ratingIcon} /> : <StarHalfIcon className={classesBook.ratingIcon} />) : <GradeIcon className={classesBook.ratingIcon} />}  
                        </div>
                        <Typography variant="caption">
                            {dayjs(review.createdAt).fromNow()}
                        </Typography>
                        {
                            review.body && (
                                <Typography variant="body2">
                                    {review.body}
                                </Typography>
                            )
                        }
                    </GridItem>
                </GridContainer>    
                </Card>
                
            )
        } 
        {
            reply && (
                <Card>
                <GridContainer
                    alignItems="center"
                    alignContent="center"
                    justify="flex-start"
                    style={{width: '70%'}}
                >
                    <GridItem xs={3} sm={3} md={4}>
                        <CardAvatar profile className={classesTopic.replyAvatar}>
                            <img src={reply.userImage} />
                        </CardAvatar>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                        <Typography variant="body1" style={{display: "block"}}>{reply.body}</Typography>
                        <Typography variant="caption" style={{display: "block"}}>{dayjs(reply.createdAt).fromNow()}</Typography>
                    </GridItem>
                </GridContainer>    
                </Card>
                
            )
        }   
        {
            topic && (
                <Card className={classesTopic.card} >
                <CardHeader color="info">
                <GridContainer>
                        <GridItem xs={4} sm={4} md={4} style={{textAlign: "center"}}>
                            <CardAvatar testimonial style={{width: 70, height: 70}}>
                                <img src={topic.userImage} />
                            </CardAvatar>
                            <Typography variant="h6" className={classesTopic.user}>{topic.username}</Typography>
                        </GridItem>
                        <GridItem xs={8} sm={8} md={8}>
                            <Typography variant="body1">{topic.title}</Typography>
                            <Typography variant="caption">{dayjs(topic.createdAt).fromNow()}</Typography>
                        </GridItem>
                </GridContainer>
                </CardHeader>
                <CardBody>
                    <Typography variant="body1" className={classesTopic.user}>{topic.body}</Typography>
                </CardBody>                 
            </Card>
            )
        }
        </div>
    )
}

export default ReportOnReplyTopicReview;
