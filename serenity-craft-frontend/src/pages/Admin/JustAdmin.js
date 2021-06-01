import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "redux/actions/userActions";
import { getReports } from "redux/actions/adminActions";
import { Actions } from 'redux/types';

// Components
import Button from "components/CustomButtons/Button";
import { makeStyles, Tooltip } from '@material-ui/core';

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
import backgrImage from "assets/img/backgr3.jpg";
import styles from "assets/jss/serenity-craft/components/justAdminStyle";
const useStyles = makeStyles(styles);

const JustAdmin = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { admin, reports } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getReports());
        return () => {
            dispatch({ type: Actions.UI.CLEAR_ACTION });
        }
    }, [])

    const handleLogOut = () => {
        dispatch(logOutUser());
    };

    return (
        <div
            className={classes.fullPage}
            style={{ backgroundImage: `url(${backgrImage})` }}
        >   
            <Tooltip title="Log out" classes={{ tooltip: classes.tooltip}}>
                <Button color="rose" round justIcon className={classes.logOutBtn} onClick={handleLogOut}>
                    <ExitToAppIcon />
                </Button>
            </Tooltip>
            {
                admin && reports && (
                    reports.length > 0 ? (
                        reports.map((report) => {
                            return <h2 key={report.reportId}>{report.reportId}</h2>
                        })
                    ) : (
                        <h2>No new reports for now...</h2>
                    )
                )
            }
        </div>
    )
}

export default JustAdmin;
