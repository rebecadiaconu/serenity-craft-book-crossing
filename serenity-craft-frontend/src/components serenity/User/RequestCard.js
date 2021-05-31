import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { acceptCrossing, rejectCrossing } from "redux/actions/crossingActions";

import RequestInfo from "components serenity/User/RequestInfo";
import CardAvatar from "components/Card/CardAvatar.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import { makeStyles, Tooltip, Typography } from '@material-ui/core';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import topicStyle from "assets/jss/serenity-craft/components/crossingRequest";
import { Actions } from 'redux/types';
const useStyles = makeStyles(topicStyle);


const RequestCard = ({ req }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { seeRequest, request } = useSelector((state) => state.ui);

    const handleClick = (event) => {
        event.preventDefault();
        dispatch({ type: Actions.UI.SEE_REQUEST, payload: req });
    };

    const acceptRequest = () => {
        dispatch(acceptCrossing(req.crossingId));
    };

    const rejectRequest = () => {
        dispatch(rejectCrossing(req.crossingId));
    };

    return (
        <Card>
        {
            req && (
                <GridContainer
                    alignItems="center"
                    alignContent="center"
                    justify="flex-start"
                >
                <GridItem xs={2} sm={2} md={3}>
                    <CardAvatar profile className={classes.requestCardAvatar}>
                        <img src={req.senderData.userImage} />
                    </CardAvatar>
                </GridItem>
                <GridItem xs={10} sm={10} md={6} onClick={handleClick}>
                    <Typography variant="body2">{req.sender} for {req.reqBook.title}, by {req.reqBook.author}</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={3} style={{display: 'flex', margin: '0 auto'}}>
                    <Tooltip title="Accept crossing" classes={{tooltip: classes.tooltip}}>
                        <Button round size="sm" justIcon color="success" onClick={acceptRequest}>
                            <CheckCircleOutlineIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Reject crossing" classes={{tooltip: classes.tooltip}}>
                        <Button round size="sm" justIcon color="danger" onClick={rejectRequest}> 
                            <NotInterestedIcon />
                        </Button>
                    </Tooltip>
                </GridItem>
                </GridContainer>
            )
        }
        {
            seeRequest && request && <RequestInfo open={seeRequest} request={request} />
        }
        </Card>
    )
}

export default RequestCard;
