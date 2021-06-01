import React, { useState, useEffect } from "react";
import history from "util/history";
import classNames from "classnames";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addToFavs, removeFromFavs } from "redux/actions/userActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Edit from "@material-ui/icons/Edit";
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ArtTrack from "@material-ui/icons/ArtTrack";

// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/bookStyle.js";

const useStyles = makeStyles(styles);

const BookContainer = ({ book, carousel }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [cardStyles, setStyles] = useState(classes.cardHover);
    const { authenticated, credentials } = useSelector((state) => state.user);

    useEffect(() => {
        if (authenticated && credentials && credentials.favs) {
            setStyles(classNames({
                [classes.cardHover]: true,
                [classes.fav]: credentials.favs.includes(book.bookId)
            }));
        }
    }, [authenticated, credentials])

    const handleViewClick = () => {
        history.push(`/admin/books/${book.bookId}`);
    };

    const handleFavsClick = (event) => {
        event.preventDefault();
        if (!credentials.favs.includes(book.bookId)) {
            credentials.favs.push(book.bookId);
            dispatch(addToFavs(book.bookId));
        } else {
            credentials.favs.splice(credentials.favs.indexOf(book.bookId), 1);
            dispatch(removeFromFavs(book.bookId));
        }
    };

    return (
        <GridItem xs={12} sm={12} md={carousel ? 12 : 4}>
            <Card product className={cardStyles}>
                <CardHeader image className={classes.cardHeaderHover}>
                    <a href="#" onClick={e => e.preventDefault()}>
                        <img src={book.coverImage} className={classes.cardImage} alt="book-cover" />
                    </a>
                </CardHeader>
                <CardBody>
                    <div className={classes.cardHoverUnder}>
                        <Tooltip
                            id="tooltip-top"
                            title="View"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            onClick={handleViewClick}
                        >
                            <Button color="primary" simple justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                            </Button>
                        </Tooltip>
                        {
                            authenticated && (( credentials?.favs?.includes(book.bookId)) ? (
                                <Tooltip
                                    id="tooltip-top"
                                    title="Remove from Favorites"
                                    placement="bottom"
                                    classes={{ tooltip: classes.tooltip }}
                                    onClick={handleFavsClick}
                                >
                                    <Button color="rose" simple justIcon>
                                        <FavoriteIcon className={classes.underChartIcons} />
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    id="tooltip-top"
                                    title="Add to Favorites"
                                    placement="bottom"
                                    classes={{ tooltip: classes.tooltip }}
                                    onClick={handleFavsClick}
                                >
                                    <Button color="rose" simple justIcon>
                                        <FavoriteBorderIcon className={classes.underChartIcons} />
                                    </Button>
                                </Tooltip>
                            ))
                        }
                        {
                            (authenticated && book.owner === credentials.username) && (
                                <>
                                <Tooltip
                                    id="tooltip-top"
                                    title="Edit"
                                    placement="bottom"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <Button color="success" simple justIcon>
                                        <Edit className={classes.underChartIcons} />
                                    </Button>
                                </Tooltip>
                                </>
                            )
                        }
                    </div>
                    <h4 className={classes.cardProductTitle}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            {book.title}
                        </a>
                    </h4>
                    <p className={classes.authorName}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            {book.author}
                        </a>
                    </p>
                </CardBody>
                <CardFooter product>
                    <div className={classes.rating}>
                        {book.averageRating < 1 ? (book.averageRating < 0.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                        {book.averageRating < 2 ? (book.averageRating < 1.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                        {book.averageRating < 3 ? (book.averageRating < 2.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                        {book.averageRating < 4 ? (book.averageRating < 3.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                        {book.averageRating < 5 ? (book.averageRating < 4.5 ? <GradeOutlinedIcon className={classes.ratingIcon} /> : <StarHalfIcon className={classes.ratingIcon} />) : <GradeIcon className={classes.ratingIcon} />}  
                        <p>{`(${book.numReviews} reviews)`}</p>
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    );
};

export default BookContainer;
