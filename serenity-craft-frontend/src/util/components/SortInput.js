import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { sortBooks } from "../../redux/actions/bookActions";
import { sortCrossings } from "redux/actions/userActions";
import { sortReports } from "redux/actions/adminActions";

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridItem from "components/Grid/GridItem.js";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle";

const useStyles = makeStyles(styles);

const SelectInput = ({ book, crossing, admin, label, items, defaultValue }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { sortValueCrossings, crossings, initCrossings } = useSelector((state) => state.user);
    const { sortValue, books } = useSelector(state => state.books);
    const { sortValue: sortValueReports, reports, initReports } = useSelector(state => state.admin);
    const [selectItem, setItem] = useState(defaultValue);
    
    // useEffect(() => {
    //     top.current.scrollTo({ top: 0, behavior: 'smooth'});
    // }, [selectItem]);

    useEffect(() => {
        if (book && selectItem !== sortValue) dispatch(sortBooks(selectItem, books));
        else if (crossing && selectItem !== sortValueCrossings) {
            let sortOn = crossings.length === 0 ? initCrossings : crossings;
            dispatch(sortCrossings(selectItem, sortOn));
        }
        else if (admin && selectItem !== sortValueReports) {
            let sortOn = reports.length === 0 ? initReports : reports;
            dispatch(sortReports(selectItem, sortOn));
        }
    }, [selectItem]);

    const handleSelect = (event) => {
        setItem(event.target.value);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                >
                    {label}
                </InputLabel>
                <Select
                    MenuProps={{
                        className: classes.selectMenu
                    }}
                    classes={{
                        select: classes.select
                    }}
                    value={selectItem}
                    onChange={handleSelect}
                    inputProps={{
                        name: "simpleSelect",
                        id: "simple-select"
                    }}
                >
                {
                    items.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={index}
                            >
                                {item}
                            </MenuItem>
                        );
                    })
                }    
                </Select>
            </FormControl>
        </GridItem>
    )
}

export default SelectInput;
