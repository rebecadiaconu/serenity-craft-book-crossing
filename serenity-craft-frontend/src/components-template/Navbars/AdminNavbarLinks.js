import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Redux
import { useDispatch } from "react-redux";
import { logOutUser } from '../../redux/actions/userActions';

// Components

// template
import Button from "components-template/CustomButtons/Button.js";

// serenity
import NotificationContainer from "components-serenity/Notification/NotificationContainer";
import RequestButton from "components-serenity/Crossing/RequestButton";

// @material-ui core
import { Hidden, makeStyles } from "@material-ui/core";

// icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const wrapper = classNames({
    [classes.wrapperRTL]: false
  });


  return (
    <div className={wrapper}>
      {
        props.authenticated ? (
          <>
          <RequestButton />
          <NotificationContainer />
          <Button
            color="transparent"
            simple
            aria-label="Log out"
            justIcon
            className={classes.buttonLink}
            onClick={handleLogOut}
          >
            <ExitToAppIcon
              className={
                classes.headerLinksSvg +
                " " +
                (classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                Log out
              </span>
            </Hidden>
          </Button>
        </>
        ) : ( 
          <>
          <Button
            color="transparent"
            simple
            aria-label="Log in"
            justIcon
            className={classes.buttonLink}
            muiClasses={{
              label: ""
            }}
            component={Link}
            to="/auth/login-page"
          >
            <Fingerprint
              className={
                classes.headerLinksSvg +
                " " +
                (classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                Log in
              </span>
            </Hidden>
          </Button>
          <Button
            color="transparent"
            simple
            aria-label="Register"
            justIcon
            className={classes.buttonLink}
            muiClasses={{
              label: ""
            }}
            component={Link}
            to="/auth/register-page"
          > 
            <PersonAdd
              className={
                classes.headerLinksSvg +
                " " +
                (classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                Register
              </span>
            </Hidden>
          </Button>
          </>
        )
      }
    </div>
  );
}

export default HeaderLinks;