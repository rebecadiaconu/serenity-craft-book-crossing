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

const ScrollToTop = ({ top }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { scrolling } = useSelector((state) => state.ui);

    // const handleClick = () => {
    //     dispatch({ type: Actions.UI.BACK_UP });
    // };

    
    const handleClick = (event) => {
        console.log(top);
        console.log(top.current);
        top.current.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div>
        {
            scrolling && (
                <IconButton className={classes.toTop} onClick={handleClick}>
                    <ExpandLessIcon />
                </IconButton>
            )
        }
        </div>
    );
}

export default ScrollToTop;
