import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAnyUser } from "redux/actions/userActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import BookContainer from "components-serenity/Book/BookContainer";
import UserCard from "components-serenity/User/UserCard";

// @material-ui core
import { CircularProgress } from "@material-ui/core";

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.ui);
    const { authenticated } = useSelector((state) => state.user);
    const { changeBook } = useSelector((state) => state.crossing);
    const { initBooks, books, searchApplied } = useSelector((state) => state.books);
    const booksPerPage = 6;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));

    useEffect(() => {
        if (authenticated) dispatch(getAnyUser(username, true));

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
        {
            (loading && !changeBook) ? (
                <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={72} color='secondary' />
            ) : (
            <>
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
                                    return <BookContainer key={index} book={book} />
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
            </>
            )
        }
        </GridContainer>
    )
}

export default UserPage;
