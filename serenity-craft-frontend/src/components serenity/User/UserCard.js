import React from 'react';

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import NavPills from "components/NavPills/NavPills.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";

// @material-ui icons
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Style
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import CardFooter from 'components/Card/CardFooter';

const userStyles = {
    ...styles,
    cardTitle,
    user: {
        fontFamily: "'Grandstander', cursive"
    },
    email: {
        color: "inherit",
        "& h4": {
        marginBottom: "0px",
        marginTop: "0px"
        }
    },
    location: {
        color: "#999999",
        fontSize: "12px",
        lineHeight: "22px",
        display: "inline-flex",
        "& svg": {
          position: "relative",
          top: "4px",
          width: "16px",
          height: "16px",
          marginRight: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
          position: "relative",
          top: "4px",
          fontSize: "16px",
          marginRight: "3px"
        }
      },
    cardCategory: {
        margin: "0 auto",
        color: "#999999"
    }
}

const useStyles = makeStyles(userStyles);

const UserCard = ({ credentials }) => {
    const classes = useStyles();

    return (
        <GridItem xs={12} sm={12} md={4}>
            <Card profile>
                <CardAvatar profile>
                    <img style={{objectFit: "cover"}} src={credentials.imageUrl} alt={credentials.username} />
                </CardAvatar>
                <CardBody profile>
                <h3 className={classes.user}>{credentials.username}</h3>
                {
                    credentials?.bio ? <p className={classes.description}>{credentials.bio}</p> : null
                }
                {
                    credentials?.mainInterests ? (
                        <>
                        <h4 className={classes.user}>I'm interested in: </h4>
                        {
                            credentials.mainInterests.map((item, index) => {
                                return (
                                    <Button round color="primary" size="sm" key={index}>{item}</Button>
                                )
                            })
                        }
                        </>
                    ) : null
                }
                </CardBody>
                <CardFooter>
                    <div className={classes.location}>
                        <AlternateEmailIcon />
                        <span>{credentials.email}</span>
                    </div>
                    <div className={classes.location}>
                        <LocationOnIcon />
                        <span>{credentials.location}</span>
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    )
}

export default UserCard;
