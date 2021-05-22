import React from 'react';
import history from "util/history";

// React
import { useDispatch } from "react-redux";

// @material-ui core
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
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(styles);

const CrossingContainer = ({ crossing }) => {
    const classes = useStyles();

    const handleClick = () => {

    };

    const handleBookClick = () => {

    };

    const handleUserClick = () => {
        history.push(`/admin/users/${crossing.recipient}`);
    };
    
    return (
        <Card className={classes.root} onClick={handleClick}>
            <GridContainer
                display="flex"
                justify="center"
                alignContent="center"
            >
                <GridItem xs={6} sm={6} md={6}>
                    <CardHeader text>
                        <CardText color={crossing.status === "pending" ? "warning" : "success"}>
                            <h5>{crossing.reqBook.title}</h5>
                            <p>{crossing.reqBook.author}</p> 
                        </CardText>
                    </CardHeader>
                    <NavLink
                        to={`users/${crossing.recipient}`}
                    >
                        <CardAvatar profile className={classes.avatar}>
                            <img src={crossing.recipientData.userImage} style={{width: 150, height: 150}} />
                        </CardAvatar>
                    </NavLink>
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
