import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { realtime } from "util/realtime";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "redux/types";

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
import GroupAddIcon from '@material-ui/icons/GroupAdd';

// Components
import Button from "components/CustomButtons/Button.js";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

const RequestsContainer =() => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { authenticated, credentials, requests } = useSelector((state) => state.user);
    const [openRequest, setOpenRequest] = useState(null);

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
    
    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

    const managerClasses = classNames({
        [classes.managerClasses]: true
    });

    return (
        <div className={managerClasses}>
        {
            authenticated && (
            <>
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
                <GroupAddIcon
                  onClick={handleClickRequest}
                  className={
                    classes.headerLinksSvg +
                    " " +
                    classes.links
                  }
                />
                <span className={classes.notifications}>5</span>
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
            </>
            )
        }
        </div>
    )
}

export default RequestsContainer;
