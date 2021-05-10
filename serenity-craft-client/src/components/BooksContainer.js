import React from 'react';

// Components
import Book from './Book';

// Redux stuff


// MUI stuff
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

// Styles
const useStyles = makeStyles({
    books: {
        width: 1000,
        margin: '0 auto'    
    },
    filterMenu: {
        marginTop: 100,
        margin: '0 auto',
        width: 1000
    }
});


const BooksContainer = () => {
    const classes = useStyles();


    return (
        <Grid container className="container">
            <Grid item xs={11} className={`container ${classes.filterMenu}`}>
                <h1>Filtering...</h1>
            </Grid>
            <Grid item xs={11} className={`container ${classes.books}`}>
                <h1>All books...</h1>
            </Grid>
        </Grid>
    )
}

export default BooksContainer;
