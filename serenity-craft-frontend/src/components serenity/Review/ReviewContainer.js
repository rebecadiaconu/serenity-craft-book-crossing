import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components
import ReviewCard from "./ReviewCard";
import Card from 'components/Card/Card';
import GridItem from 'components/Grid/GridItem';
import NavPills from 'components/NavPills/NavPills';

// @material-ui icons
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


const ReviewContainer = ({ classes, reviews }) => {
    const dispatch = useDispatch();
    const { book } = useSelector((state) => state.books);
    const { credentials } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(reviews.length > 0) {
            if (reviews[0].username === credentials.username) setShow(true);
        }
    }, [reviews]);

    return (
        <GridItem xs={12} sm={12} md={12}>
            {
                book?.reviews ? (
                    <NavPills
                    color="warning"
                    alignCenter
                    tabs={[
                    {
                        tabButton: "All",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.body && review.username !== book.owner).map((review, index) => {
                                        return (
                                            <ReviewCard key={index} review={review} classes={classes} show={show} />
                                        ) 
                                    })
                                ) : <h2 className={classes.message}>No other user besides the owner reviewed this book... <SentimentVeryDissatisfiedIcon /></h2>
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "0",
                        tabIcon: GradeOutlinedIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 0 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 0 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 0</h2>
                                    )
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "1",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 1 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 1 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 1</h2>
                                    )
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "2",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 2 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 2 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 2</h2>
                                    )
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "3",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 3 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 3 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 3</h2>
                                    )
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "4",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 4 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 4 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 4</h2>
                                    )
                            }
                            </Card>
                        )
                    },
                    {
                        tabButton: "5",
                        tabIcon: GradeIcon,
                        tabContent: (
                            <Card className={classes.reviewContainer}>
                            {
                                reviews.filter((review) => review.rating === 5 && review.body && review.username !== book.owner).length > 0 ? (
                                    reviews.filter((review) => review.rating === 5 && review.body && review.username !== book.owner).map((review, index) => {
                                        return <ReviewCard key={index} review={review} classes={classes} show={show} />
                                    })
                                ) : (
                                        <h2 className={classes.message}>No user rate this book with 5</h2>
                                    )
                            }
                            </Card>
                        )
                    }
                ]}
                />
                ) : (
                    <Card>
                        <h2 className={classes.message}>This books have no reviews yet... <SentimentVeryDissatisfiedIcon /></h2>
                    </Card>
                )
            }
            </GridItem>
    )
}

export default ReviewContainer;
