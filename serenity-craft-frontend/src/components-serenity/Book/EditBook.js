import React, { useState, forwardRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import featherLogo from "assets/img/feather-logo.png";
import { allGenres } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { editBook } from "redux/actions/bookActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import Danger from "components-template/Typography/Danger.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';
import UploadImage from 'util/components/UploadImage';

// @material-ui core
import { 
    Chip,
    Checkbox,
    CircularProgress,
    Dialog,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    Slide,
    Typography
 } from '@material-ui/core';
 import TextField from "@material-ui/core/TextField"

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import styles from "assets/jss/serenity-craft/util/formStyle"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const EditBook = ({ open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { errors, loadingButton } = useSelector((state) => state.ui);
    const { book } = useSelector((state) => state.books);
    const [ genres, setGenres ] = useState(book.genres);
    const [dialog, setDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        setDialog(true);

        return () => {
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        }
    }, []);

    useEffect(() => {
        if (dialog) {
            setValue('title', book.title);
            setValue('author', book.author);
            setValue('publisher', book.publisher);
            setValue('language', book.language);
            setValue('numPages', book.numPages);
            setValue('genres', book.genres);
            if (!!book?.publicationYear) setValue('publicationYear', book.publicationYear);
            if (!!book?.summary) setValue('summary', book.summary);
            if (!!book?.bookQuality) setValue('bookQuality', book.bookQuality);
            if (!!book?.ownerRating) setValue('ownerRating', book.ownerRating);
            if (!!book?.ownerReview) setValue('ownerReview', book.ownerReview);
        }
    }, [dialog]);

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

    const handleClose = () => {
        dispatch({ type: Actions.BOOK.STOP_EDIT });
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
        if (bookData.ownerRating === book.ownerRating && bookData.ownerReview === book.ownerReview) {
            delete bookData.ownerReview;
            delete bookData.ownerRating;
        }

        dispatch(editBook(bookData, book.bookId));
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
                style={{width: '95%', position: 'relative', marginLeft: 10}}
            >
                <GridItem xs={2} sm={2} md={2}>
                    <img src={featherLogo} className={classes.logo} />
                </GridItem>
                <GridItem xs={10} sm={10} md={10}>
                    <Typography variant="h2" className={classes.header}>
                    Edit "{book.title}"
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
                        type="text"
                        multiline
                        rows={4}
                        label="Book's summary" 
                        error={errors?.summary ? true : false}
                        helperText={errors?.summary}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
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
                        bookCover
                    />
                </GridItem>
                <Button 
                    color="rose"
                    disabled={loadingButton}
                    onClick={handleSubmit(onSubmit)}
                    className={classes.submitButton}
                >
                    UPDATE DETAILS
                    {
                        loadingButton && (
                            <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={32} color='secondary' />                        )
                    }
                </Button>
            </GridContainer> 
        </Dialog>
    )
}

export default EditBook;
