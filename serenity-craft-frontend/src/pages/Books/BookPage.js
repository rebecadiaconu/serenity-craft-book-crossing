import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBook } from "redux/actions/bookActions";

// Components
import ReviewCard from "components serenity/Book/ReviewCard";
import Card from 'components/Card/Card';
import Button from "components/CustomButtons/Button.js";
import CardAvatar from 'components/Card/CardAvatar';
import CardBody from "components/Card/CardBody.js";
import CardFooter from 'components/Card/CardFooter';
import Accordion from "components/Accordion/Accordion";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Divider, List, ListItem, makeStyles, Tooltip, Typography } from '@material-ui/core';

// @material-ui icons
import Edit from "@material-ui/icons/Edit";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormatQuote from "@material-ui/icons/FormatQuote";
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';

// @material-ui components

// Styles
import styles from "assets/jss/serenity-craft/components/bookStyle";
import CardHeader from 'components/Card/CardHeader';

const useStyles = makeStyles(styles);

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
                <ListItem>
                    <Typography variant="caption">
                        Book's quality rate by owner: {bookQuality}
                    </Typography>
                </ListItem>
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

    return (
        <div>
            <div className={classes.testimonialIcon}>
                  <FormatQuote />
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
    const classes = useStyles();
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { book } = useSelector((state) => state.books);
    const { credentials } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getBook(bookId));
    }, []);

    return (
        <GridContainer className={classes.root}>
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
                            book.ownerReview && (
                                <OwnerReview rating={book.ownerRating ?? null} content={book.ownerReview ?? ""} owner={book.owner} ownerImage={book.ownerImage} />
                            ) 
                        }
                        </GridItem>
                    </GridContainer>
                    {
                        (credentials.username === book.owner) && (
                            <div className={classes.actions}>
                                <Tooltip title="Edit" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow>
                                    <Button color="success" simple justIcon><Edit /></Button>
                                </Tooltip>
                                <Tooltip title="Delete" classes={{ tooltip: classes.tooltip }} placement="bottom" arrow>
                                    <Button color="danger" simple justIcon><HighlightOffIcon /></Button>
                                </Tooltip>
                            </div>
                        )
                    }
                </Card>
            </GridItem> 
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                {/* <Tooltip
                            id="tooltip-top"
                            title="Add review"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <Button color="rose" simple justIcon>
                                <CommentIcon className={classes.underChartIcons} />
                            </Button>
                        </Tooltip> */}
                    <h2>Book reviews...</h2>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

export default BookPage;
