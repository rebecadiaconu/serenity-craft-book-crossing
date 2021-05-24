import React, { useState, useEffect, forwardRef } from 'react';
import { useParams, NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import history from "util/history";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBook, deleteBook } from "redux/actions/bookActions";
import { Actions } from 'redux/types';

// Components
import ChangeCoverImage from "components serenity/Book/ChangeCoverImage";
import EditBook from "components serenity/Book/EditBook";
import ReviewContainer from "components serenity/Review/ReviewContainer";
import Card from 'components/Card/Card';
import Button from "components/CustomButtons/Button.js";
import CardAvatar from 'components/Card/CardAvatar';
import CardBody from "components/Card/CardBody.js";
import CardFooter from 'components/Card/CardFooter';
import Accordion from "components/Accordion/Accordion";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import { IconButton, List, ListItem, makeStyles, Tooltip, Typography } from '@material-ui/core';

// @material-ui icons
import RateReviewIcon from '@material-ui/icons/RateReview';
import Edit from "@material-ui/icons/Edit";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormatQuote from "@material-ui/icons/FormatQuote";
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';

// Styles
import styles from "assets/jss/serenity-craft/components/bookStyle";
import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);
const useAlert = makeStyles(alertStyles);


const Details = ({ numPages, language, publisher, bookQuality, publicationYear, ownerRating }) => {
    return (
        <div>
            <List>
                <ListItem>
                    <Typography variant="caption">
                        Publisher: {publisher}
                    </Typography>                
                </ListItem>
                <ListItem>
                    <Typography variant="caption">
                        Book language: {language}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption">
                        Number of pages: {numPages}
                    </Typography>
                </ListItem>
                {
                    publicationYear ? 
                    <ListItem>
                        <Typography variant="caption">
                            Publication year: {publicationYear}
                        </Typography>
                    </ListItem> : null
                }
                {
                    bookQuality ? 
                    <ListItem>
                        <Typography variant="caption">
                            Book's quality rate by owner: {bookQuality}
                        </Typography>
                    </ListItem> : null
                }
                {
                    ownerRating ? 
                    <ListItem>
                        <Typography variant="caption">
                            Owner rating: {ownerRating}
                        </Typography>
                    </ListItem> : null
                }
            </List>
        </div>
    );
}

const OwnerReview = ({ content, owner, ownerImage }) => {
    const classes = useStyles();
    const { credentials } = useSelector((state) => state.user);
    const { book } = useSelector((state) => state.books);

    return (
        <div>
            <div className={classes.testimonialIcon + " " + classes.reviewWrapper} style={{width: 140, margin: '0 auto'}}>
                <FormatQuote />
                {
                    (!!book.ownerReview || !!book.ownerRating) ? (
                        <>
                            <Tooltip title="Edit review" classes={{ tooltip: classes.tooltip }}>
                                <Button justIcon size="sm" color="success" simple className={classes.reviewLeftButton} ><Edit /></Button>
                            </Tooltip>
                            <Tooltip title="Delete review" classes={{ tooltip: classes.tooltip }}>
                                <Button justIcon size="sm" color="danger" simple className={classes.reviewRightButton} ><HighlightOffIcon /></Button>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Add review" classes={{ tooltip: classes.tooltip }}>
                            <Button justIcon size="sm" color="primary" simple className={classes.reviewLeftButton} ><RateReviewIcon /></Button>
                        </Tooltip>
                    )
                }
            </div>
            <CardBody>
                <Typography variant="body2" className={classes.cardTestimonialDescription}>
                    {content}
                </Typography>
            </CardBody>
            <CardFooter testimonial>
                <h6 className={classes.cardCategory}>{owner}</h6>
                <NavLink
                    to={owner !== credentials.username ? `/admin/users/${owner}` : `/admin/user`}
                >
                    <CardAvatar testimonial testimonialFooter>
                        <img src={ownerImage} />
                    </CardAvatar>
                </NavLink>
            </CardFooter>
        </div>
    )
};

const BookPage = () => {
    const alertClasses = useAlert();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { book, justAdded, edit, deleteBookNow } = useSelector((state) => state.books);
    const { credentials } = useSelector((state) => state.user);
    const { message, errors } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        dispatch(getBook(bookId));
        return () => dispatch({ type: Actions.UI.CLEAR_ACTION });
    }, []);

    useEffect(() => {
        if (message) successAlert(message);
    }, [message]);

    useEffect(() => {
        if (errors?.error) errorAlert(errors.error);
    }, [errors])

    const handleDelete = () => {
        dispatch(deleteBook(bookId));
    }

    const handleJustAdded = () => {
        dispatch({ type: Actions.BOOK.DONE_ADDED });
    };

    const successAlert = (text) => {
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Done!"
                onConfirm={() => {
                    if (deleteBookNow) {
                        setAlert(null);
                        history.push("/");
                        dispatch({ type: Actions.BOOK.STOP_DELETE });
                    }
                    else setAlert(null);
                }}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {text}
            </SweetAlert>
        );
    };

    const errorAlert = (error) => {
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Error"
                onConfirm={() => {
                    if (deleteBookNow) {
                        setAlert(null);
                        dispatch({ type: Actions.BOOK.STOP_DELETE });
                    }
                    else setAlert(null);
                }}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {error}
            </SweetAlert>
        );
    };
    
    const hideAlert = () => {
        setAlert(null);
    };

    const handleEdit = () => {
        dispatch({ type: Actions.BOOK.EDIT });
    }

    const confirmDelete = () => {
        dispatch({ type: Actions.BOOK.DELETE });
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => handleDelete()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
                cancelBtnCssClass={alertClasses.button + " " + alertClasses.danger}
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
                You will not be able to recover this book and the rest of the data associate with it!
            </SweetAlert>
        );
    };

    return (
        <GridContainer className={classes.root}>
            {alert}
            {
                edit && <EditBook open={edit} />
            }
            <ChangeCoverImage justAdded={justAdded} handleClose={handleJustAdded} />
            <GridItem xs={12} sm={12} md={12}>
                <Card testimonial>
                    <GridContainer
                        display="flex"
                        justify="center"
                        alignContent="center"
                        alignItems="center"
                    >
                        <GridItem xs={12} sm={12} md={6}>
                            <CardHeader className={classes.coverContainer}>
                                <img src={book.coverImage} className={classes.coverImage} />
                            </CardHeader>
                            <CardFooter product>
                                <Tooltip title={`Average rating:  ${book.averageRating}`} classes={{ tooltip: classes.tooltip }} placement="bottom" arrow>
                                    <div className={classes.rating}>
                                        {book.averageRating < 1 ? (book.averageRating < 0.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                                        {book.averageRating < 2 ? (book.averageRating < 1.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                                        {book.averageRating < 3 ? (book.averageRating < 2.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                                        {book.averageRating < 4 ? (book.averageRating < 3.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                                        {book.averageRating < 5 ? (book.averageRating < 4.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                                        <p>{`(${book.numReviews} reviews)`}</p>
                                    </div>
                                </Tooltip>
                            </CardFooter>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} >
                        <Typography variant="h2" className={classes.special}>
                            {book.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            <small>By </small>{book.author}
                        </Typography>
                        {
                            book?.genres ? (
                                <>
                                <h4><small>Book's genres: </small></h4>
                                {
                                    book.genres.map((item, index) => {
                                        return (
                                            <Button round color="info" size="sm" key={index}>{item}</Button>
                                        )
                                    })
                                }
                                </>
                            ) : null
                        }

                        {
                            book.summary ? (
                                <GridItem xs={12} sm={12} md={7} style={{display: 'flex',margin: '0 auto'}}
>
                                <Accordion
                                    active={-1}
                                    collapses={[
                                        {
                                            title: 'Book summary',
                                            content: <Typography variant="body2">
                                                {book.summary}
                                            </Typography>
                                        },
                                        {
                                            title: 'More details',
                                            content: <Details 
                                                numPages={book.numPages} 
                                                language={book.language} 
                                                publisher={book.publisher}
                                                bookQuality={book.bookQuality}
                                                ownerRating={book.ownerRating ?? ""}
                                                publicationYear={book.publicationYear ?? ""}
                                            />
                                        }
                                    ]}
                                />
                                </GridItem>
                            ) : (
                                <GridItem xs={12} sm={12} md={7} style={{display: 'flex',margin: '0 auto'}}
>
                                <Accordion
                                    active={-1}
                                    collapses={[
                                        {
                                            title: 'More details',
                                            content: <Details 
                                                numPages={book.numPages} 
                                                language={book.language} 
                                                publisher={book.publisher}
                                                bookQuality={book.bookQuality}
                                                publicationYear={book.publicationYear ?? ""}
                                            />
                                        }
                                    ]}
                                />
                                </GridItem>
                            )
                        }
                        {
                            book.ownerReview ? (
                                <OwnerReview content={book.ownerReview ?? ""} owner={book.owner} ownerImage={book.ownerImage} />
                            ) : (
                                <OwnerReview content="Added by" owner={book.owner} ownerImage={book.ownerImage} />
                            )
                        }
                        </GridItem>
                    </GridContainer>
                    {
                        (book.owner === credentials.username) && (
                            <div className={classes.actions}>
                                <Tooltip title="Edit" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow>
                                    <Button color="success" simple justIcon onClick={handleEdit}><Edit /></Button>
                                </Tooltip>
                                <Tooltip title="Delete" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow>
                                    <Button color="danger" simple justIcon onClick={confirmDelete}><HighlightOffIcon /></Button>
                                </Tooltip>
                            </div>
                        )
                    }
                </Card>
            </GridItem> 
            <ReviewContainer classes={classes} />
        </GridContainer>
    )
}

export default BookPage;
