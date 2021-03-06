import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Components

// template
import Button from "components-template/CustomButtons/Button";

// Redux
import { useSelector } from "react-redux";

// @material-ui core
import { 
  AppBar,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar
} from "@material-ui/core";

// icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import CachedIcon from '@material-ui/icons/Cached';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.js";
const useStyles = makeStyles(styles);

const AuthNavbar = (props) => {
  const {authenticated} = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  var list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to={"/admin/all-books"} className={classes.navLink}>
          <Dashboard className={classes.listItemIcon} />
          <ListItemText
            primary={"All books"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      {
        !authenticated && (
          <>
          <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/register-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/auth/register-page")
            })}
          >
            <PersonAdd className={classes.listItemIcon} />
            <ListItemText
              primary={"Register"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/login-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/auth/login-page")
            })}
          >
            <Fingerprint className={classes.listItemIcon} />
            <ListItemText
              primary={"Login"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/reset-password"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute("/auth/reset-password")
            })}
          >
            <CachedIcon className={classes.listItemIcon} />
            <ListItemText
              primary={"Reset Pass"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        </>
        )
      }
    </List>
  );
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown className={classes.middleContent}>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default AuthNavbar;