import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components

// template
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components-template/CustomButtons/Button.js";

// @material-ui core
import { 
  AppBar,
  Hidden,
  makeStyles,
  Toolbar
} from "@material-ui/core";

// icons
import Notifications from "@material-ui/icons/Notifications";
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";


// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
const useStyles = makeStyles(styles);

const AdminNavbar = (props) => {
  const classes = useStyles();
  const { color, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize = classes.sidebarMinimize;

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
          {/* Here we create navbar brand, based on route name */}
          <Button component={Link} to={props.location.pathname} className={classes.title} color="transparent">
            {brandText}

          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks authenticated={props.authenticated} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
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