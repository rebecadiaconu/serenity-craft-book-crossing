import React, { forwardRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { Actions } from "redux/types";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card";
import CardBody from 'components/Card/CardBody';
import CardAvatar from 'components/Card/CardAvatar';

// @material-ui core
import { Typography } from '@material-ui/core';

// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/serenity-craft/components/crossingRequest"

const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const RequestInfo = ({ request, open }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        dispatch({ type: Actions.UI.STOP_SEE_REQUEST });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
                className={classes.modalGrid}
            >
                <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h2" className={classes.header}>
                        Crossing Info
                    </Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{position: 'relative'}}>
                    <Typography variant="h4" className={classes.header}>
                        What you get
                    </Typography>
                    <Card>
                        <NavLink to={`/admin/users/${request.sender}`}>
                            <CardAvatar profile className={classes.userCardImage} >
                                <img src={request.senderData.userImage} />
                            </CardAvatar>
                        </NavLink>
                        <CardBody style={{margin: '0 auto', textAlign: 'center'}}>
                            <NavLink to={`/admin/books/${request.randomBookId}`}>
                                <img src={request.randomBook.coverImage} className={classes.cover} />
                            </NavLink>
                            <Typography variant="body2" className={classes.specialSubtitle}>
                                {`${request.randomBook.title}, by `}<small>{`${request.randomBook.author}`}</small>
                            </Typography>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Typography variant="h4" className={classes.header}>
                        What you give
                    </Typography>
                    <Card>
                        <CardBody style={{margin: '0 auto', textAlign: 'center'}}>
                            <NavLink to={`/admin/books/${request.reqBookId}`}>
                                <img src={request.reqBook.coverImage} className={classes.cover} />
                            </NavLink>
                            <Typography variant="body2" className={classes.specialSubtitle}>
                                {`${request.reqBook.title}, by `}<small>{`${request.reqBook.author}`}</small>
                            </Typography>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="body1" className={classes.footer}>
                        The book that you're going to receive is choosed according to your preferences. If you don't like it, you can change it after accepting the crossing request.
                    </Typography>
                    <Typography variant="body1" className={classes.footer}>
                        We ecourage you to take a look on this user's available books!
                    </Typography>
                </GridItem>
            </GridContainer>
        </Dialog>
    )
}

export default RequestInfo;
