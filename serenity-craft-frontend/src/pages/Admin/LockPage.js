import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";

// icons

import avatar from "assets/img/faces/avatar.jpg";

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
                <CustomInput
                    labelText="Enter Password"
                    id="company-disabled"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "password",
                        autoComplete: "off"
                    }}
                />
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