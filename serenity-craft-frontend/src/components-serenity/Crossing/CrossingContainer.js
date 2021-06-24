import React from 'react';
import history from "util/history";
import { NavLink } from 'react-router-dom';

// React
import { useSelector } from "react-redux";

// Components

// template
import Card from "components-template/Card/Card";
import CardText from 'components-template/Card/CardText';
import CardHeader from 'components-template/Card/CardBody';
import CardAvatar from 'components-template/Card/CardAvatar';
import CardFooter from 'components-template/Card/CardFooter';
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// @material-ui core
import { makeStyles, Typography } from "@material-ui/core";

// Styles
import styles from "assets/jss/serenity-craft/components/crossing/crossingContainer";
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
