import React, { useState, useEffect,forwardRef } from 'react';
import { useParams } from "react-router-dom"; 

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAnyUser } from "redux/actions/userActions";
import { changeCrossingBook } from "redux/actions/crossingActions"; 
import { Actions } from "redux/types";

// Components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// @material-ui core
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Typography } from '@material-ui/core';

// @material-ui icons


// Styles
import styles from "assets/jss/serenity-craft/components/changeBookModal";
const useStyles = makeStyles(styles);


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ChangeBookModal = ({ open, user, recipient }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { crossingId } = useParams();
    const { books } = useSelector((state) => state.user);
    const { userBooks } = useSelector((state) => state.ui);
    const [newbook, setNewBook] = useState(null);

    useEffect(() => {
        if (recipient) dispatch(getAnyUser(recipient));
    }, []);

    const handleChange = (value) => {
        setNewBook(value);
    };

    const handleClose = () => {
        dispatch({ type: Actions.CROSSING.STOP_CHANGE_BOOK });
    };

    const handleSubmit = () => {
        dispatch(changeCrossingBook(crossingId, newbook));
    };  

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            className={classes.root}
        >
            <FormControl>
                <Typography variant="h4" className={classes.header}>
                    Choose another book to receive!
                </Typography>
                <RadioGroup value={newbook} onChange={(event) => handleChange(event.target.value)}>
                <GridContainer
                    display="flex"
                    justify="space-between"
                    alignItems="center"
                    alignContent="center"
                    className={classes.grid}
                >
                {
                    user ? (
                        books.map((book) => {
                            return book.available ? (
                                <GridItem xs={12} sm={12} md={4} onClick={() => handleChange(book.bookId)}>
                                    <Card className={newbook !== book.bookId ? classes.card : classes.card + " " + classes.selected}>
                                        <CardBody className={classes.cover} >
                                            <FormControlLabel value={book.bookId} control={<Radio />} />
                                            <Tooltip title={`Average rating: ${book.averageRating}`} classes={{ tooltip: classes.tooltip }} >
                                                <img src={book.coverImage} />
                                            </Tooltip>
                                        </CardBody>
                                        <Typography variant="body2" className={classes.footer}>
                                            {`${book.title}, by `}<small>{`${book.author}`}</small>
                                        </Typography>
                                    </Card>
                                </GridItem>
                            ) : null
                        })
                    ) : (
                        userBooks.map((book) => {
                            return book.available ? (
                                <GridItem xs={12} sm={12} md={4} onClick={() => handleChange(book.bookId)}>
                                    <Card className={newbook !== book.bookId ? classes.card : classes.card + " " + classes.selected}>
                                        <CardBody className={classes.cover} >
                                            <FormControlLabel value={book.bookId} control={<Radio />} />
                                            <Tooltip title={`Average rating: ${book.averageRating}`} classes={{ tooltip: classes.tooltip }} >
                                                <img src={book.coverImage} />
                                            </Tooltip>
                                        </CardBody>
                                        <Typography variant="body2" className={classes.footer}>
                                            {`${book.title}, by `}<small>{`${book.author}`}</small>
                                        </Typography>
                                    </Card>
                                </GridItem>
                            ) : null
                        })
                    )
                }
                <GridItem xs={12} sm={12} md={12}>
                    <Button color="rose" className={classes.submitButton} onClick={handleSubmit}>CHANGE BOOK</Button>
                </GridItem>
                </GridContainer>
                </RadioGroup>
            </FormControl>
        </Dialog>
    )
}

export default ChangeBookModal;
