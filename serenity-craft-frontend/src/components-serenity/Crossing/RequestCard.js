import React, { useState, useEffect } from 'react';
import classNames from "classnames";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { acceptCrossing, rejectCrossing, markRequestsRead } from "redux/actions/crossingActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import Card from "components-template/Card/Card.js";
import CardAvatar from "components-template/Card/CardAvatar.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import RequestInfo from "components-serenity/Crossing/RequestInfo";

// @material-ui core
import { makeStyles, Tooltip, Typography } from '@material-ui/core';

// icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

// Styles
import requestStyle from "assets/jss/serenity-craft/components/crossing/crossingRequest";
const useStyles = makeStyles(requestStyle);


const RequestCard = ({ req }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [cardStyles, setStyles] = useState(undefined);
    const { seeRequest, request } = useSelector((state) => state.ui);

    useEffect(() => {
        setStyles(classNames({
            [classes.unseen]: !req.read
        }))
    }, []);

    useEffect(() => {
        if (seeRequest && request && !request.read) dispatch(markRequestsRead(request.crossingId));
    }, [seeRequest, request]);

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
        <Card className={cardStyles}>
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
