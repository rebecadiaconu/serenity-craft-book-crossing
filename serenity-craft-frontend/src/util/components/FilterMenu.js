import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFilterData } from "../../redux/actions/booksActions";

// @material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

// @material-ui icons
import FilterListIcon from '@material-ui/icons/FilterList';

// core components
import GridItem from "components/Grid/GridItem.js";
import Button from 'components/CustomButtons/Button';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/filterMenuStyle";

const useStyles = makeStyles(styles);

const FilterMenu = ({ label, items, onlyOne, type }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { initBooks, filterData, filterApplied } = useSelector((state) => state.books);
    const [checked, setChecked] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (checked.length !== 0 || filterApplied) {
            dispatch(setFilterData(initBooks, checked, type, filterData));
        }
    }, [checked]);

    useEffect(() => {
        if(!filterApplied && checked.length !== 0) {
            setChecked([]);
            console.log('sdvdrbdb');
        }
    }, [filterApplied]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            if (onlyOne && newChecked.length === 2) {
                newChecked.shift();
            }
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <GridItem xs={12} sm={12} md={2}>
            <Button fullWidth aria-describedby='popover-filter-button' variant="contained" color="transparent" onClick={handleClick}>
                <FilterListIcon className={checked.length === 0 ? classes.filterIcon : classes.activeIcon}/> 
                <span className={checked.length === 0 ? null : classes.activeText}>{label}</span>
            </Button>
            <Popover
                id='popover-filter-menu'
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper style={{width: '100%'}}>
                    <List role="list" style={{maxHeight: 300, overflow: 'auto'}}>
                        {
                            items.map((item, index) => {
                                return (
                                    <ListItem key={index} role="listitem" button onClick={() => handleToggle(item)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={checked.indexOf(item) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                            />     
                                        </ListItemIcon>
                                        <ListItemText id={index} primary={item} />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Paper>
            </Popover>
        </GridItem>
    );
};

export default FilterMenu;
