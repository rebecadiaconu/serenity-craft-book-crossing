import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAnyUser } from "redux/actions/userActions";
import { Actions } from 'redux/types';

// components
import Button from "components/CustomButtons/Button";
import UserCard from "components serenity/User/UserCard";
import BookContainer from "components serenity/Book/BookContainer";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// @material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Textfield from "@material-ui/core/Textfield";

// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.ui);
    const { initBooks, books, searchApplied } = useSelector((state) => state.books);
    const booksPerPage = 6;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));

    useEffect(() => {
        dispatch(getAnyUser(username));

        return () => {
            dispatch({ 
                type: Actions.UI.REMOVE_USER
            });
        }
    }, []);

    useEffect(() => {
        setShowed(Math.min(booksPerPage * index, books.length));
    }, [books]);

    const handleShowMore = (event) => {
        event.preventDefault();
        setIndex(index + 1);
        setShowed(Math.min(booksPerPage * index, books.length));
    };

    
    return (
        <GridContainer
            alignContent="flex-end"
        >
            <UserCard user={user} search />
            <GridItem xs={12} sm={12} md={8}>
                <GridContainer
                    display="flex"
                    alignContent="center"
                >
                    {
                        books.length === 0 ?
                        (
                            searchApplied ?
                                <h2 style={{margin: '0 auto'}}>No book found by your custom search...</h2> : 
                                <h2>No books added by {username}...</h2>
                        ) : (
                            books.slice(0, showedBooks).map((book, index) => {
                                return book.available ? <BookContainer key={index} book={book} /> :   null
                            })
                        )
                    }
                    {
                        (showedBooks < books.length) ? (
                            <Button 
                                style={{margin: '0 auto', display: "flex"}}
                                disabled={showedBooks >= books.length ? true : false}
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
            </GridItem>
        </GridContainer>
    )
}

export default UserPage;
