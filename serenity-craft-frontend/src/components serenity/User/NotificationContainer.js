import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from "classnames";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { realtime } from "util/realtime";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "redux/types";
import { markNotificationRead, getNotifications } from "redux/actions/userActions";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// @material-ui/icons
import ReportIcon from '@material-ui/icons/Report';
import Notifications from "@material-ui/icons/Notifications";
import RateReviewIcon from '@material-ui/icons/RateReview';
import ShareIcon from '@material-ui/icons/Share';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

// Components
import Button from "components/CustomButtons/Button.js";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

const NotificationContainer =() => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { authenticated, notifications, credentials } = useSelector((state) => state.user);
    const [openNotification, setOpenNotification] = useState(null);
    const [justRead, setRead] = useState(false);

    useEffect(() => {
        dispatch(getNotifications());
    }, []);

    useEffect(() => {
        if (!!credentials) {

            realtime.ref(`/notifications/`).on("child_added", (snapshot) => {
                if (snapshot.val().recipient === credentials.username && notifications.filter((notification) => notification.notificationId === snapshot.val().notificationId).length === 0) dispatch(getNotifications());
            });

            realtime.ref(`/notifications/`).on("child_removed", (snapshot) => {
                if (snapshot.val().recipient === credentials.username && notifications.filter((notification) => notification.notificationId === snapshot.val().notificationId).length > 0) dispatch(getNotifications());
            });
        }
    }, [credentials]);

    useEffect(() => {
        if (openNotification) {
            let unreadNotificationsIds = notifications.filter(notif => !notif.read).map(notif => notif.notificationId);
            if (unreadNotificationsIds.length > 0) {
                setRead(true);
                dispatch(markNotificationRead(unreadNotificationsIds));
            }
        } else {
            if (justRead) {
                setRead(false);
                dispatch(getNotifications());
            }
        }
    }, [openNotification]);

    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.target);
        }
    };

    const handleCloseNotification = () => {
        setOpenNotification(null);
    };

    const handleClick = () => {

    };
    
    const dropdownItem = classNames(classes.dropdownItem, classes.roseHover);
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
                    aria-label="Notifications"
                    aria-owns={openNotification ? "notification-menu-list" : null}
                    aria-haspopup="true"
                    onClick={handleClickNotification}
                    className={classes.buttonLink}
                >
                {
                    (notifications && notifications.length > 0) ? (
                        notifications.filter((notif) => !notif.read).length > 0 ? (
                            <Badge max={99} badgeContent={notifications.filter((notif) => !notif.read).length} color="error">
                                <Notifications className={ classes.headerLinksSvg + " " + classes.links} />
                            </Badge>
                        ) : (
                            <Notifications className={ classes.headerLinksSvg + " " + classes.links} />
                        )
                    ) : (
                        <Notifications className={ classes.headerLinksSvg + " " + classes.links} />
                    )
                }
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
                    style={{maxHeight: 400, maxWidth: 600, overflow: 'auto'}}
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
                            {
                                notifications && notifications.length > 0 ? (
                                    notifications.map((notif) => {
                                        let message;
                                        let icon;
                                        let redirectTo;
                                        let time = dayjs(notif.createdAt).fromNow();

                                        switch(notif.type) {
                                            case 'topic':
                                                message =  `${notif.sender} added a new topic ${time}.`;
                                                icon = <ShareIcon fontSize="small" className={classes.icon} />;
                                                redirectTo = `/admin/crossings/${notif.crossingId}/${notif.topicId}`;
                                                break
                                            case 'reply':
                                                message = `${notif.sender} added a reply on your topic ${time}.`;
                                                icon = <ChatBubbleIcon fontSize="small" className={classes.icon} />;
                                                redirectTo = `/admin/crossings/${notif.crossingId}/${notif.topicId}`;
                                                break
                                            case 'review':
                                                message = `${notif.sender} added a review on your book ${time}.`;
                                                icon = <RateReviewIcon fontSize="small" className={classes.icon} />;
                                                redirectTo = `/admin/books/${notif.bookId}`;
                                                break
                                            case 'accept-request':
                                                message = `${notif.sender} has accepted your crossing request ${time}.`;
                                                icon = <CheckCircleIcon fontSize="small" className={classes.icon} />;
                                                redirectTo = `/admin/crossings/${notif.crossingId}`;
                                                break
                                            case 'cancel-request':
                                                message = `${notif.sender} has canceled your crossing ${time}.`;
                                                icon = <NotInterestedIcon fontSize="small" className={classes.icon} />;
                                                redirectTo = `/admin/crossings/${notif.crossingId}`;
                                                break
                                            case 'report-edit':
                                                message = notif.body;
                                                icon = <ReportIcon fontSize="small" className={classes.icon} />;
                                                (notif.crossingId && notif.topicId) ? redirectTo = `/admin/crossings/${notif.crossingId}/${notif.topicId}` : (
                                                    notif.bookId ? redirectTo = `/admin/books/${notif.bookId}` : (
                                                            redirectTo = `/admin/crossings/${notif.crossingId}`
                                                    )
                                                )
                                                break
                                            case 'report-delete':
                                                message = `The admin accepted one report on your name and deleted the specific content!`
                                                icon = <ReportIcon fontSize="small" className={classes.icon} />;     
                                        }

                                        return (
                                            notif.type === "report-delete" ? (
                                                <MenuItem 
                                                    className={notif.read ? classes.read + " " + classes.dropdownItem : classes.noRead + " " + classes.dropdownItem}
                                                    key={notif.notificationId}
                                                    style={{maxHeight: 'unset'}}
                                                >
                                                    {icon}{message}
                                                </MenuItem>
                                            ) : (
                                                <NavLink
                                                    key={notif.notificationId}
                                                    to={redirectTo}
                                                >
                                                    <MenuItem 
                                                        className={notif.read ? classes.read + " " + classes.dropdownItem : classes.noRead + " " + classes.dropdownItem}
                                                        key={notif.notificationId}
                                                        style={{maxHeight: 'unset'}}
                                                    >
                                                        {icon}{message}
                                                    </MenuItem>
                                                </NavLink>
                                            )
                                            
                                        )
                                    })
                                ) : (
                                <MenuItem
                                    onClick={handleCloseNotification}
                                    className={dropdownItem}
                                >
                                    No notifications for you yet
                                </MenuItem>
                                )
                            }
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

export default NotificationContainer;
