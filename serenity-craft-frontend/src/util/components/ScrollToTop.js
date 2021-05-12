import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Zoom from '@material-ui/core/Zoom';
import IconButton from "@material-ui/core/IconButton";

// @material-ui icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/scrollTopStyle.js";
import { Actions } from 'redux/types';
const useStyles = makeStyles(styles);

const ScrollToTop = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { scrolling } = useSelector((state) => state.ui);

    const handleClick = () => {
        dispatch({ type: Actions.UI.BACK_UP });
    };

    return (
        <div>
        {
            scrolling && (
                <IconButton onClick={handleClick} className={classes.toTop}>
                    <ExpandLessIcon />
                </IconButton>
            )
        }
        </div>
    );
}

export default ScrollToTop;
