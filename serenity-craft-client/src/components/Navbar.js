import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppIcon from '../images/icon-white.png';


// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';


import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShareIcon from '@material-ui/icons/Share';


// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from "../redux/types";


const useStyles = makeStyles({
    appBar: {
        boxShadow: "none",
        display: 'flex'
    },
    icon: {
        margin: '0 0 10px',
        width: 40
    },
    iconButton: {
        margin: '0 25px',
        padding: '0 10px'
    },
    profileMenuItem: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    profileIcon: {
        border: 'solid 1.5px white'
    },
    rightMenu: {
        position: 'absolute',
        right: 20
    },
    menu: {
        marginTop: 5
    },
    siteName: {
        fontFamily: 'Sacramento, cursive'
    }
});


const Navbar = () => {
    const classes = useStyles();
    const { authenticated, credentials } = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);

    const openProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeProfileMenu = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {

    };

    return (
        <AppBar color='primary' className={classes.appBar}>
            <Toolbar className="container">
                <img src={AppIcon} alt="app-icon" className={classes.icon}/>
                <Typography variant="h4" className={classes.siteName} component={Link} to="/" style={{color: 'white'}}>Serenity Craft</Typography>
                <div className={classes.rightMenu}>
                {
                    authenticated ? (
                        <>
                            <IconButton className={classes.iconButton} edge="end" color="inherit" aria-label="My books" size="small">
                                <MenuBookIcon />
                            </IconButton>
                            <IconButton className={classes.iconButton} edge="end" color="inherit" aria-label="Crossings" size="small">
                                <ShareIcon />
                            </IconButton>
                            <IconButton className={classes.iconButton} edge="end" color="inherit" aria-label="Requests" size="small">
                                <Badge badgeContent={4} color="secondary">
                                    <PeopleIcon />
                                </Badge>
                            </IconButton>
                            <IconButton className={classes.iconButton} edge="end" color="inherit" aria-label="Notifications" size="small">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={openProfileMenu} className={classes.iconButton} edge="end" color="inherit" aria-label={credentials.username}>
                                <Avatar className={classes.profileIcon} src={credentials.imageUrl}/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={closeProfileMenu}
                                className={classes.menu}
                            >
                                <MenuItem onClick={closeProfileMenu} style={{margin: '5px 5px'}} component={Link} to="/user">
                                    <AccountCircleIcon style={{paddingRight: '5px'}} fontSize="small"/>
                                    <span>Profile</span>
                                </MenuItem>
                                <MenuItem onClick={closeProfileMenu} style={{margin: '5px 5px'}} component={Link} to="/settings">
                                    <SettingsIcon style={{paddingRight: '5px'}} fontSize="small"/>
                                    <span>Settings </span>
                                </MenuItem>
                                <MenuItem onClick={closeProfileMenu} style={{margin: '5px 5px'}} component={Link} onClick={handleLogOut}>
                                    <ExitToAppIcon style={{paddingRight: '5px'}} fontSize="small"/>
                                    <span>Log out</span>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Signup
                            </Button>
                        </>
                    )
                }
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;