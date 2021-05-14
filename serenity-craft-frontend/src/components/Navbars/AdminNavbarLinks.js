import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from '../../redux/actions/userActions';
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Search from "@material-ui/icons/Search";

// core components
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = useState(null);
  const [openRequest, setOpenRequest] = useState(null);

  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickRequest = event => {
    if (openRequest && openRequest.contains(event.target)) {
      setOpenRequest(null);
    } else {
      setOpenRequest(event.currentTarget);
    }
  };

  const handleCloseRequest = () => {
    setOpenRequest(null);
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location.href = "/admin/dashboard";
  };

  // const searchButton =
  //   classes.top +
  //   " " +
  //   classes.searchButton;
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
  const wrapper = classNames({
    [classes.wrapperRTL]: false
  });

  const managerClasses = classNames({
    [classes.managerClasses]: true
  });

  return (
    <div className={wrapper}>
      {/* <CustomInput
        formControlProps={{
          className: classes.top + " " + classes.search
        }}
        inputProps={{
          placeholder: "Search",
          inputProps: {
            "aria-label": "Search",
            className: classes.searchInput
          }
        }}
      />
      <Button
        color="white"
        aria-label="edit"
        justIcon
        round
        className={searchButton}
      >
        <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
      </Button> */}
      <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={classes.buttonLink}
        muiClasses={{
          label: ""
        }}
        component={Link}
        to="/"
      >
        <Dashboard
          className={
            classes.headerLinksSvg +
            " " +
            (classes.links)
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            Dashboard
          </span>
        </Hidden>
      </Button>

      {
        props.authenticated ? (
          <>
          <div className={managerClasses}>
            <Button
              color="transparent"
              justIcon
              aria-label="Requests"
              aria-owns={openRequest ? "request-menu-list" : null}
              aria-haspopup="true"
              onClick={handleClickRequest}
              className={classes.buttonLink}
              muiClasses={{
                label: ""
              }}
            >
              <GroupAddIcon
                className={
                  classes.headerLinksSvg +
                  " " +
                  classes.links
                }
              />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp implementation="css">
                <span
                  onClick={handleClickNotification}
                  className={classes.linkText}
                >
                  Requests
                </span>
              </Hidden>
            </Button>
            <Popper
              open={Boolean(openRequest)}
              anchorEl={openRequest}
              transition
              disablePortal
              placement="bottom"
              className={classNames({
                [classes.popperClose]: !openRequest,
                [classes.popperResponsive]: true,
                [classes.popperNav]: true
              })}
            >
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  id="notification-menu-list"
                  style={{ transformOrigin: "0 0 0" }}
                >
                  <Paper className={classes.dropdown}>
                    <ClickAwayListener onClickAway={handleCloseRequest}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={handleCloseRequest}
                          className={dropdownItem}
                        >
                          Mike John responded to your email
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseRequest}
                          className={dropdownItem}
                        >
                          You have 5 new tasks
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseRequest}
                          className={dropdownItem}
                        >
                          
                          You're now friend with Andrew
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseRequest}
                          className={dropdownItem}
                        >
                          Another Notification
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseRequest}
                          className={dropdownItem}
                        >
                          Another One
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <div className={managerClasses}>
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={openNotification ? "notification-menu-list" : null}
              aria-haspopup="true"
              onClick={handleClickNotification}
              className={classes.buttonLink}
              muiClasses={{
                label: ""
              }}
            >
              <Notifications
                className={
                  classes.headerLinksSvg +
                  " " +
                  classes.links
                }
              />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp implementation="css">
                <span
                  onClick={handleClickNotification}
                  className={classes.linkText}
                >
                  Notification
                </span>
              </Hidden>
            </Button>
            <Popper
              open={Boolean(openNotification)}
              anchorEl={openNotification}
              transition
              disablePortal
              placement="bottom"
              className={classNames({
                [classes.popperClose]: !openNotification,
                [classes.popperResponsive]: true,
                [classes.popperNav]: true
              })}
            >
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  id="notification-menu-list"
                  style={{ transformOrigin: "0 0 0" }}
                >
                  <Paper className={classes.dropdown}>
                    <ClickAwayListener onClickAway={handleCloseNotification}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                        >
                          Mike John responded to your email
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                        >
                          You have 5 new tasks
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                        >
                          
                          You're now friend with Andrew
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                        >
                          Another Notification
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                        >
                          Another One
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          
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

          {/* <div className={managerClasses}>
            <Button
              color="transparent"
              aria-label="Person"
              justIcon
              aria-owns={openProfile ? "profile-menu-list" : null}
              aria-haspopup="true"
              onClick={handleClickProfile}
              className={classes.buttonLink}
              muiClasses={{
                label: ""
              }}
            >
              <Person
                className={
                  classes.headerLinksSvg +
                  " " +
                  classes.links
                }
              />
              <Hidden mdUp implementation="css">
                <span onClick={handleClickProfile} className={classes.linkText}>
                  Profile
                </span>
              </Hidden>
            </Button>
            <Popper
              open={Boolean(openProfile)}
              anchorEl={openProfile}
              transition
              disablePortal
              placement="bottom"
              className={classNames({
                [classes.popperClose]: !openProfile,
                [classes.popperResponsive]: true,
                [classes.popperNav]: true
              })}
            >
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  id="profile-menu-list"
                  style={{ transformOrigin: "0 0 0" }}
                >
                  <Paper className={classes.dropdown}>
                    <ClickAwayListener onClickAway={handleCloseProfile}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={handleCloseProfile}
                          className={dropdownItem}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseProfile}
                          className={dropdownItem}
                        >
                          Settings
                        </MenuItem>
                        <Divider light />
                        <MenuItem
                          onClick={handleCloseProfile}
                          className={dropdownItem}
                        >
                          Log out
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div> */}
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