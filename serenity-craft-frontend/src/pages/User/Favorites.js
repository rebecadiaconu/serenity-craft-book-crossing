import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserFavs } from 'redux/actions/userActions';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import GridContainer from 'components-template/Grid/GridContainer';

// serenity
import BookContainer from "components-serenity/Book/BookContainer";

// @material-ui core
import { Typography, makeStyles } from '@material-ui/core';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridItem from 'components-template/Grid/GridItem';

import styles from "assets/jss/serenity-craft/components/bookStyle.js";
const useStyles = makeStyles(styles);

const Favorites = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { credentials, favBooks } = useSelector((state) => state.user);
    const { initBooks } = useSelector((state) => state.books);
    const booksPerPage = 9;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(0);

    useEffect(() => {
        if (initBooks && credentials) dispatch(getUserFavs(credentials.favs, initBooks));
    }, [initBooks, credentials]);

    useEffect(() => {
        if (favBooks) setShowed(Math.min(booksPerPage * index, favBooks.length));
    }, [favBooks]);

    const handleShowMore = (event) => {
        // event.preventDefault();
        setIndex(index + 1);
        setShowed(Math.min(booksPerPage * index, favBooks.length));
    };

    return (
        <GridContainer 
            justify="flex-start"
            direction="row"
            alignContent="center"
            alignItems="center"
        >
            <GridItem xs={12} sm={12} md={12}>
                <Typography variant="h2" className={classes.special} style={{textAlign: 'center', marginBottom: 10}}>
                    Your favorites
                </Typography>
            </GridItem>
            {
                favBooks?.length === 0 ? 
                (
                    <h2 style={{margin: '0 auto'}}>No books added to favorites yet...</h2>
                ) : (
                    favBooks?.slice(0, showedBooks).map((book, index) => {
                        return <BookContainer key={index} book={book} />
                    })
                )
            }
            <br />
            {
                (showedBooks < favBooks?.length) ? (
                    <Button 
                        style={{margin: '0 auto', display: "flex"}}
                        disabled={showedBooks >= favBooks?.length ? true : false}
                        color="primary" 
                        round 
                        size="lg"
                        onClick={handleShowMore}
                    >
                        <ExpandMoreIcon />
                        <span>Show more</span>
                    </Button>
                ) : null
            } 
        </GridContainer> 
    )
}

export default Favorites;
