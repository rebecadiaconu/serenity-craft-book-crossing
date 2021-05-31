import React from 'react';
import history from "util/history";
import { NavLink } from 'react-router-dom';

// React
import { useSelector, useDispatch } from "react-redux";

// @material-ui core
import { makeStyles } from '@material-ui/core';
import { Typography, Tooltip } from "@material-ui/core";

// Components
import Card from "components/Card/Card";
import CardText from 'components/Card/CardText';
import CardHeader from 'components/Card/CardBody';
import CardAvatar from 'components/Card/CardAvatar';
import CardFooter from 'components/Card/CardFooter';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// Styles
import styles from "assets/jss/serenity-craft/components/crossingContainer";

const useStyles = makeStyles(styles);

const CrossingContainer = ({ crossing, color }) => {
    const classes = useStyles();
    const { credentials } = useSelector((state) => state.user);

    const handleClick = () => {
        if (crossing.status !== "pending") history.push(`/admin/crossings/${crossing.crossingId}`);
    };
    
    return (
        <Card className={classes.root} onClick={handleClick}>
            <GridContainer
                display="flex"
                justify="center"
                alignContent="center"
            >
                <GridItem xs={6} sm={6} md={6}>
                    <CardHeader>
                        <CardText color={color} >
                            <h5>{crossing.reqBook.title}</h5>
                            <p>{crossing.reqBook.author}</p> 
                        </CardText>
                    </CardHeader>
                    <CardAvatar profile className={classes.avatar}>
                        <img src={credentials.username !== crossing.recipient ? crossing.recipientData.userImage : crossing.senderData.userImage} style={{width: 150, height: 150}} />
                    </CardAvatar>
                    <CardFooter>
                        <Typography className={classes.info} variant="body2" >{credentials.username !== crossing.recipient ? crossing.recipient : crossing.sender}</Typography>
                    </CardFooter>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <CardAvatar className={classes.cover}>
                        <img src={crossing.reqBook.coverImage} />
                    </CardAvatar>
                </GridItem>
            </GridContainer>
        </Card>
    )
}

export default CrossingContainer;
