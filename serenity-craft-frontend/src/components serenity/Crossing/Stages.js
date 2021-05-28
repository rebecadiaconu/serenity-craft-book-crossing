import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeCrossingStatus } from "redux/actions/crossingActions";
import { Actions } from "redux/types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components

import styles from "assets/jss/material-dashboard-pro-react/components/tasksStyle.js";
const useStyles = makeStyles(styles);

const Stages = ({ tasksIndexes, tasks, checkedIndexes }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { crossingId } = useParams();
    const { crossing } = useSelector((state) => state.crossing);
    const [pressed, setPressed] = useState(false);
    const [checked, setChecked] = useState(checkedIndexes);

    useEffect(() => {
       let stages = {
            sendBook: checked.indexOf(0) !== -1,
            receiveBook: checked.indexOf(1) !== -1,
            sendBack: checked.indexOf(2) !== -1,
            getBookBack: checked.indexOf(3) !== -1
        };

        if (crossing.status !== "done" && pressed) dispatch(changeCrossingStatus(stages, crossingId));
    }, [checked]);

    const handleChecked = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } 
        setPressed(true);
        setChecked(newChecked);
    }

    const tableCellClasses = classnames(classes.tableCell);

    return (
        <Table className={classes.table}>
        <TableBody>
            {tasksIndexes.map(value => (
            <TableRow key={value} className={classes.tableRow}>
                <TableCell className={tableCellClasses}>
                <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    disabled={crossing.canceled === true  || crossing.status === "done" || checked.indexOf(value) !== -1 || (value !== 0 && checked.indexOf(value - 1)) === -1}
                    tabIndex={-1}
                    onClick={() => handleChecked(value)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                    checked: classes.checked,
                    root: classes.root
                    }}
                />
                </TableCell>
                <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
}

export default Stages;
