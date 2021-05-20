import React from 'react';

// @material-ui core
import { Typography } from "@material-ui/core";

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
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styles);

const CrossingContainer = ({ crossing }) => {
    const classes = useStyles();

    const handleClick = () => {

    };

    const handleBookClick = () => {

    };

    const handleUserClick = () => {

    };
    
    return (
        <Card className={classes.root} onClick={handleClick}>
            <GridContainer
                display="flex"
                justify="center"
                alignContent="center"
            >
                <GridItem xs={6} sm={6} md={6}>
                    <CardHeader color={crossing.status === "pending" ? "warning" : "success"} text>
                        <CardText color={crossing.status === "pending" ? "warning" : "success"}>
                            <h5>{crossing.reqBook.title}</h5>
                            <p>{crossing.reqBook.author}</p> 
                        </CardText>
                    </CardHeader>
                    <CardAvatar  onClick={handleUserClick}>
                        <img className={classes.avatar} src={crossing.recipientData.userImage} />
                    </CardAvatar>
                    <CardFooter>
                        <Typography className={classes.info} variant="body2" >{crossing.recipient}</Typography>
                    </CardFooter>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <CardAvatar className={classes.cover} onClick={handleBookClick}>
                        <img src={crossing.reqBook.coverImage} />
                    </CardAvatar>
                </GridItem>
            </GridContainer>
        </Card>
    )
}

export default CrossingContainer;
