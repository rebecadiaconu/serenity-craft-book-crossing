import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOutUser } from "redux/actions/userActions";

// Components

// template
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components-template/CustomButtons/Button.js";

// serenity
import NotificationContainer from "components-serenity/Notification/NotificationContainer";

// @material-ui core
import { 
  AppBar,
  Hidden,
  makeStyles,
  Toolbar
} from "@material-ui/core";

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notifications from "@material-ui/icons/Notifications";
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";


// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
const useStyles = makeStyles(styles);

const AdminNavbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { color, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize = classes.sidebarMinimize;

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <>
              <Button
                justIcon
                round
                color="rose"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
              </>
            ) : (
              <Button
                justIcon
                round
                color="rose"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          <Button component={Link} to={props.location.pathname} className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks authenticated={props.authenticated} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <NotificationContainer />
          <Button
            color="transparent"
            justIcon
            aria-label="open notifications"
            onClick={handleLogOut}
          >
            <ExitToAppIcon
              className={
                classes.headerLinksSvg +
                " " +
                (classes.links)
              }
            />
          </Button>
          <Button
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func
};

export default AdminNavbar;