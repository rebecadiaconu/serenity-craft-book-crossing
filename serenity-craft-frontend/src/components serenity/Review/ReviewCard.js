import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink } from "react-router-dom";
import { Actions } from "redux/types";

// Redux
import { useSelector, useDispatch } from "react-redux";

// @material-ui core
import { Tooltip, Typography } from '@material-ui/core';

// @material-ui icons
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Edit from "@material-ui/icons/Edit";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// components

import Button from "components/CustomButtons/Button.js";
import CardAvatar from 'components/Card/CardAvatar';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const ReviewCard = ({ show, review, classes }) => {
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.user);
    dayjs.extend(relativeTime);

    const handleEditReview = () => {
        dispatch({ type: Actions.REVIEW.EDIT_REVIEW, payload: review.reviewId });
    };

    const handleDeleteReview = () => {
        dispatch({ type: Actions.REVIEW.DELETE_REVIEW, payload: review.reviewId  });
    };

    return (
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
                (credentials.username === review.username && show) && (
                    <div className={classes.actions}>
                        <Tooltip title="Edit" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow onClick={handleEditReview} >
                            <Button color="success" simple justIcon><Edit /></Button>
                        </Tooltip>
                        <Tooltip title="Delete" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow onClick={handleDeleteReview} >
                            <Button color="danger" simple justIcon><HighlightOffIcon /></Button>
                        </Tooltip>
                    </div>
                )
            }
        </GridContainer>
    );
};

export default ReviewCard;
