import React from 'react';

// Components

// template
import Accordion from "components-template/Accordion/Accordion";
import Button from "components-template/CustomButtons/Button.js";
import Card from 'components-template/Card/Card';
import CardHeader from 'components-template/Card/CardHeader';
import CardAvatar from 'components-template/Card/CardAvatar';
import CardBody from "components-template/Card/CardBody.js";
import CardFooter from 'components-template/Card/CardFooter';
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// @material-ui core
import { List, ListItem, makeStyles, Tooltip, Typography } from '@material-ui/core';

// icons
import FormatQuote from "@material-ui/icons/FormatQuote";
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';

// Styles
import styles from "assets/jss/serenity-craft/components/book/bookStyle";
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

    return (
        <div>
            <div className={classes.testimonialIcon + " " + classes.reviewWrapper} style={{width: 100, margin: '0 auto'}}>
                <FormatQuote />
            </div>
            <CardBody>
                <Typography variant="body2" className={classes.cardTestimonialDescription}>
                    {content}
                </Typography>
            </CardBody>
            <CardFooter testimonial>
                <h6 className={classes.cardCategory}>{owner}</h6>
                <CardAvatar testimonial testimonialFooter>
                    <img src={ownerImage} />
                </CardAvatar>
            </CardFooter>
        </div>
    )
};

const ReportOnBookInfo = ({ book }) => {
    const classes = useStyles();
    return (
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
                                <GridItem xs={12} sm={12} md={7} style={{display: 'flex',margin: '0 auto'}}>
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
                                <GridItem xs={12} sm={12} md={7} style={{display: 'flex',margin: '0 auto'}}>
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
                                <OwnerReview content={book.ownerReview ?? ""} owner={book.owner} ownerImage={book.ownerImage} ownerReviewId={book.ownerReviewId ?? null} />
                            ) : (
                                <OwnerReview content="Added by" owner={book.owner} ownerImage={book.ownerImage} />
                            )
                        }
                    </GridItem>
                </GridContainer>
            </Card>
        </GridItem>
    )
}

export default ReportOnBookInfo;
