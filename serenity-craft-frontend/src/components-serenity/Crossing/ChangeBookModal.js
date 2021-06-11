import React, { useState, useEffect,forwardRef } from 'react';
import { useParams } from "react-router-dom"; 

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAnyUser } from "redux/actions/userActions";
import { changeCrossingBook } from "redux/actions/crossingActions"; 
import { Actions } from "redux/types";

// Components

//template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// @material-ui core
import { 
    Dialog,
    FormControl,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Slide,
    Tooltip,
    Typography
 } from '@material-ui/core';

// Styles
import styles from "assets/jss/serenity-craft/components/changeBookModal";
const useStyles = makeStyles(styles);


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ChangeBookModal = ({ open, recipient }) => {
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
                    userBooks && (
                        userBooks.filter((book) => book.available && !book.involved).length === 0 ? (
                            <h2>Your crossing partener do not have any other book available...</h2>
                        ) : (
                            userBooks.filter((book) => book.available && !book.involved).map((book) => {
                                return (
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
                                ) 
                            })
                        )
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
