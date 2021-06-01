import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from '../../redux/actions/userActions';
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import NotificationContainer from "components serenity/User/NotificationContainer";
import RequestsButton from "components serenity/User/RequestsButton";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import { Link } from "react-router-dom";

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
          <RequestsButton />
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