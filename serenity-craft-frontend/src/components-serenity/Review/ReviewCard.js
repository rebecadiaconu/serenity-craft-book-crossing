import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink, useParams } from "react-router-dom";
import { Actions } from "redux/types";
import { reportOnBookReviewTopicReply } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import CardAvatar from 'components-template/Card/CardAvatar';
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import ReportForm from "util/components/ReportForm";

// @material-ui core
import { Tooltip, Typography } from '@material-ui/core';

// icons
import ReportIcon from '@material-ui/icons/Report';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Edit from "@material-ui/icons/Edit";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const ReviewCard = ({ show, review, classes }) => {
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { authenticated, credentials } = useSelector((state) => state.user);
    const { sendReport, reportOnReview } = useSelector((state) => state.ui);
    dayjs.extend(relativeTime);

    const handleEditReview = () => {
        dispatch({ type: Actions.REVIEW.EDIT_REVIEW, payload: review.reviewId });
    };

    const handleDeleteReview = () => {
        dispatch({ type: Actions.REVIEW.DELETE_REVIEW, payload: review.reviewId  });
    };

    return (
        <>
        {
            sendReport && authenticated && reportOnReview &&
            <ReportForm 
                open={sendReport}
                items={reportOnBookReviewTopicReply}
                type="review"
                username={reportOnReview.username}
                userImage={reportOnReview.userImage}
                review={reportOnReview}
                bookId={bookId}
            />
        }
        <GridContainer
            justify="flex-start"
            alignContent="flex-start"
            alignItems="flex-start"
            className={classes.review}
        >
            <GridItem xs={4} sm={4} md={2}>
                <NavLink
                        to={`/admin/users/${review.username}`}
                    >
                        <CardAvatar>
                            <img src={review.userImage} style={{objectFit: 'cover', width: 130, height: 130}} />
                        </CardAvatar>
                </NavLink>
            </GridItem>
            <GridItem xs={8} sm={8} md={9} className={classes.left}>
                <Typography variant="subtitle1" style={{fontFamily: "'Grandstander', cursive"}}>
                    {review.username} 
                </Typography>
                <div>
                    {review.rating < 1 ? (review.rating < 0.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                    {review.rating < 2 ? (review.rating < 1.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                    {review.rating < 3 ? (review.rating < 2.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                    {review.rating < 4 ? (review.rating < 3.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                    {review.rating < 5 ? (review.rating < 4.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
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
            {
                (credentials.username === review.username && show) ? (
                    <div className={classes.actions}>
                        <Tooltip title="Edit" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow onClick={handleEditReview} >
                            <Button color="success" simple justIcon><Edit /></Button>
                        </Tooltip>
                        <Tooltip title="Delete" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow onClick={handleDeleteReview} >
                            <Button color="danger" simple justIcon><HighlightOffIcon /></Button>
                        </Tooltip>
                    </div>
                ) : (
                    authenticated && (<div className={classes.actions}>
                        <Tooltip
                            id="tooltip-top"
                            title="REPORT"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <Button color="danger" simple justIcon onClick={(event) => {
                                event.preventDefault();
                                dispatch({ type: Actions.UI.REPORT_REVIEW, payload: review })}
                            }>
                                <ReportIcon className={classes.underChartIcons} />
                            </Button>
                        </Tooltip>
                    </div>)
                )
            }
        </GridContainer>
        </>
    );
};

export default ReviewCard;
