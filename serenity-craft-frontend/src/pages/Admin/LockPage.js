import React, { useState, useEffect } from "react";
import avatar from "assets/img/backgr.jpg";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import CardAvatar from "components-template/Card/CardAvatar.js";
import CardFooter from "components-template/Card/CardFooter.js";

// @material-ui core 
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/views/lockScreenPageStyle.js";
const useStyles = makeStyles(styles);

const LockPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.user);
    const { admin } = useSelector((state) => state.admin);
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");

    useEffect(() => {
        let id = setTimeout(() => {
            setCardAnimation("");
        }, 700);

        return () => {
            window.clearTimeout(id);
        };
    });


    return (
        <div className={classes.container}>
        <form>
            <Card
                profile
                className={classes.customCardClass + " " + classes[cardAnimaton]}
            >
            <CardAvatar profile className={classes.cardAvatar}>
                <img src={credentials.imageUrl} alt="admin" />
            </CardAvatar>
            <CardBody profile>
                <h4 className={classes.cardTitle}>{credentials.username}</h4>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" round>
                    Unlock
                </Button>
            </CardFooter>
            </Card>
        </form>
        </div>
    );
}

export default LockPage;