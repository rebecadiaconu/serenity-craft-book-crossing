import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Redux 
import { useSelector, useDispatch } from  "react-redux";
import { editDetails } from '../../redux/actions/userActions';
import { allGenres } from "util/general";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";

// serenity
import UploadImage from "util/components/UploadImage";

// @material-ui core
import { 
    Chip,
    Checkbox,
    CircularProgress,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    Typography
 } from "@material-ui/core";
 import TextField from "@material-ui/core/TextField"

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextsmsIcon from '@material-ui/icons/Textsms';

// Styles
import styles from "assets/jss/serenity-craft/components/editProfile";
const useStyles = makeStyles(styles);

const EditProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { credentials } = useSelector((state) => state.user);
    const { loadingButton } = useSelector((state) => state.ui);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mainInterests, setInterests] = useState([]);

    useEffect(() => {
        setValue('bio', credentials.bio);
        setValue('location', credentials.location);
        if (!!credentials?.mainInterests) setInterests(credentials.mainInterests);
    }, [credentials]);

    useEffect(() => {
        setValue('mainInterests', mainInterests);
    }, [mainInterests]);

    const onSubmit = (formData) => {
        let data = {
            ...formData,
            mainInterests: mainInterests
        }
        dispatch(editDetails(data));
    };

    const handleToggle = (value) => {
        const currentIndex = mainInterests.indexOf(value);
        const newChecked = [...mainInterests];

        if (currentIndex === -1) {
            newChecked.push(value);
            if (newChecked.length === 4) {
                newChecked.shift();
            }
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setInterests(newChecked);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <GridContainer 
            display="flex"
            justify="center"
            alignContent="center"
            style={{margin: 0, width: '95%'}}
        >
           <GridItem xs={12} sm={12} md={8}>
                <List>
                    <ListItem>
                        <TextField
                        className={classes.textField}
                            color="secondary"
                            name="bio" 
                            type="text" 
                            label="Bio"
                            inputRef={register()}
                            InputLabelProps={{ shrink: true }}  
                            fullWidth
                            type="text"
                            multiline
                            rowsMax={3}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="end">
                                        <TextsmsIcon />
                                    </InputAdornment>,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            className={classes.textField}
                            color="secondary"
                            name="location" 
                            type="text" 
                            label="Location"
                            inputRef={register()}
                            InputLabelProps={{ shrink: true }}  
                            fullWidth
                            type="text"
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="end">
                                        <LocationOnIcon />
                                    </InputAdornment>,
                            }}
                        />
                    </ListItem>
                    <ListItem className={classes.mainInterests}>
                        <Typography variant="caption" display="block" style={{marginTop: 5}}>I'm interested in</Typography>
                        {
                            mainInterests.map((item, index) => {
                                return (
                                    <Chip 
                                        className={classes.chip}
                                        key={index}
                                        onDelete={() => handleToggle(item)} 
                                        label={item}
                                    />
                                )
                            })
                        }
                        <IconButton className={classes.expand}>
                            <ExpandMoreIcon onClick={handleClick} />
                        </IconButton>
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
                                        allGenres.map((item, index) => {
                                            return (
                                                <ListItem key={index} role="listitem" button onClick={() => handleToggle(item)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            checked={mainInterests.indexOf(item) !== -1}
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
                    </ListItem>
                </List>
                <Button 
                    round
                    color="info"
                    disabled={loadingButton}
                    onClick={handleSubmit(onSubmit)}
                    className={classes.submitButton}
                >
                    UPDATE DETAILS
                    {
                        loadingButton && (
                            <CircularProgress style={{position: 'absolute'}} size={32} color='secondary' />
                        )
                    }
                </Button>
           </GridItem>
           <GridItem xs={12} sm={12} md={4}>
                <UploadImage
                    changeButtonProps={{
                      color: "info",
                      round: true,
                      className: classes.submitButton
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true,
                      className: classes.submitButton
                    }}  
                />
           </GridItem>
       </GridContainer>
    )
}

export default EditProfile;
