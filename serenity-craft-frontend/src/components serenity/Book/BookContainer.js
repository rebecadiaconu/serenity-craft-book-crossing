import React from "react";

// Redux
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ArtTrack from "@material-ui/icons/ArtTrack";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CommentIcon from '@material-ui/icons/Comment';

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
    const classes = useStyles();
    const { authenticated, credentials } = useSelector((state) => state.user);

    return (
        <GridItem xs={12} sm={12} md={carousel ? 12 : 4}>
            <Card product className={classes.cardHover}>
                <CardHeader image className={classes.cardHeaderHover}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
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
                        >
                            <Button color="primary" simple justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                            </Button>
                        </Tooltip>
                        <Tooltip
                            id="tooltip-top"
                            title="Add review"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <Button color="rose" simple justIcon>
                                <CommentIcon className={classes.underChartIcons} />
                            </Button>
                        </Tooltip>
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
                                <Tooltip
                                    id="tooltip-top"
                                    title="Remove"
                                    placement="bottom"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <Button color="danger" simple justIcon>
                                        <HighlightOffIcon className={classes.underChartIcons} />
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
