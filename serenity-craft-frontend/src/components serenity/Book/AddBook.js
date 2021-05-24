import React, { useState, forwardRef, useEffect } from 'react';
import featherLogo from "assets/img/feather-logo.png";
import { useForm } from "react-hook-form";
import { allGenres } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { addBook } from "redux/actions/bookActions";
import { Actions } from 'redux/types';

// @material-ui core
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from '@material-ui/core';

// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components
import Danger from "components/Typography/Danger.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";

// Styles
import styles from "assets/jss/serenity-craft/components/addForm"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AddBook = ({ open, handleClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { errors } = useSelector((state) => state.ui);
    const [ genres, setGenres ] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
    }, [])

    useEffect(() => {
        setValue('genres', genres);
    }, [genres]);

    const handleToggle = (value) => {
        const currentIndex = genres.indexOf(value);
        const newChecked = [...genres];

        if (currentIndex === -1) {
            newChecked.push(value);
            if (newChecked.length === 4) {
                newChecked.shift();
            }
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setGenres(newChecked);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const onSubmit = (formData) => {
        let bookData = {
            ...formData,            
            numPages: parseInt(formData.numPages),
            bookQuality: parseInt(formData.bookQuality),
            publicationYear: parseInt(formData.publicationYear),
            ownerRating: parseInt(formData.ownerRating),
            genres: genres
        };
        dispatch(addBook(bookData));
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >   
            <GridContainer
                display="flex"
                justify="center"
                alignItems="flex-start"
                alignContent="center"
                style={{width: '95%', position: 'relative', marginLeft: 10, width: 900}}
            >
                <GridItem xs={2} sm={2} md={2}>
                    <img src={featherLogo} className={classes.logo} />
                </GridItem>
                <GridItem xs={10} sm={10} md={10}>
                    <Typography variant="h2" className={classes.header}>
                    Add a new book to Serenity
                    </Typography>
                    <Typography variant="h4" className={classes.header}>
                    Make people happy by sharing your books!
                    </Typography>
                </GridItem>           
                <GridItem xs={12} sm={12} md={6} style={{marginTop: 30, position: 'relative'}}>
                    <Typography variant="subtitle1">
                        Basic Info
                    </Typography>
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="title" 
                        type="text" 
                        label="Title" 
                        error={errors?.title ? true : false}
                        helperText={errors?.title}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="author" 
                        type="text" 
                        label="Author" 
                        error={errors?.author ? true : false}
                        helperText={errors?.author}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="publisher" 
                        type="text" 
                        label="Publisher" 
                        error={errors?.publisher ? true : false}
                        helperText={errors?.publisher}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="language" 
                        type="text" 
                        label="Language" 
                        error={errors?.language ? true : false}
                        helperText={errors?.language}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <Typography variant="caption" display="block" style={{marginTop: 5}}>Book's genres:</Typography>
                    {
                        genres.map((item, index) => {
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
                        onClose={handleCloseMenu}
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
                                                        checked={genres.indexOf(item) !== -1}
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
                    {
                        errors?.genres && (
                            <Danger>{errors.genres}</Danger>
                        )
                    }
                    <br />
                    <br />
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="numPages" 
                        type="number"
                        label="Number of pages" 
                        error={errors?.numPages ? true : false}
                        helperText={errors?.numPages}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{marginTop: 30}}>
                    <Typography variant="subtitle1">
                        Extra Details
                    </Typography>
                    <TextField 
                        required
                        className={classes.textField} 
                        variant="outlined"
                        name="bookQuality" 
                        type="number" 
                        label="Book's quality" 
                        error={errors?.bookQuality ? true : false}
                        helperText={errors?.bookQuality}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="publicationYear" 
                        type="number" 
                        label="Publication Year" 
                        error={errors?.publicationYear ? true : false}
                        helperText={errors?.publicationYear}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="summary" 
                        multiline
                        rows={4}
                        label="Book's summary" 
                        error={errors?.summary ? true : false}
                        helperText={errors?.summary}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="ownerRating" 
                        type="number" 
                        label="Your rating" 
                        error={errors?.ownerRating ? true : false}
                        helperText={errors?.ownerRating}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="ownerReview" 
                        multiline
                        rows={4}
                        label="Your review" 
                        error={errors?.ownerReview ? true : false}
                        helperText={errors?.ownerReview}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                </GridItem>
                <Button 
                    color="rose"
                    onClick={handleSubmit(onSubmit)}
                    className={classes.submitButton}
                >
                    ADD BOOK
                </Button>
            </GridContainer> 
        </Dialog>
    )
}

export default AddBook;
