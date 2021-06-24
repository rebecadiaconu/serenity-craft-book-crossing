import React from 'react';
import { useSelector } from "react-redux";

// Components

// @material-ui core
import {
    IconButton,
    makeStyles
} from "@material-ui/core";

// icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// Styles
import styles from "assets/jss/serenity-craft/util/scrollTopStyle.js";
const useStyles = makeStyles(styles);

const ScrollToTop = ({ top }) => {
    const classes = useStyles();
    const { scrolling } = useSelector((state) => state.ui);
    
    const handleClick = () => {
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
