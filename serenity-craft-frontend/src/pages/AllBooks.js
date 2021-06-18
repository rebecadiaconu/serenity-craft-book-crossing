import React, { useState, useEffect } from "react";
import { booksSort } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, setSearchValue } from "redux/actions/bookActions";
import { getFilterData } from "util/general";
import { Actions } from "redux/types";

// Components

// template
import Button from "components-template/CustomButtons/Button";
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";

// serenity
import AddBook from "components-serenity/Book/AddBook";
import BookContainer from "components-serenity/Book/BookContainer";
import FilterMenu from "util/components/FilterMenu";
import SortInput from "util/components/SortInput";

// @material-ui core
import {
    CircularProgress,
    InputAdornment,
    Tooltip
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField"


// icons
import AddIcon from '@material-ui/icons/Add';
import Search from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const AllBooks = () => {
    const dispatch = useDispatch();
    const { actual, initBooks, books, filterApplied, searchValue, searchApplied } = useSelector((state) => state.books);
    const { loading } = useSelector((state) => state.ui);
    const { authenticated } = useSelector((state) => state.user);
    const booksPerPage = 9;
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));
    const [filterData, setFilters] = useState({});

    useEffect(() => {
        dispatch(getAllBooks());
    }, []);

    useEffect(() => {
        if (actual === 'book') setFilters(getFilterData(initBooks));
    }, [initBooks]);

    useEffect(() => {
        if (books.length > 0) setShowed(Math.min(booksPerPage * index, books.length));
    }, [books]);

    const handleShowMore = (event) => {
        event.preventDefault();
        setIndex(index + 1);
        setShowed(Math.min(booksPerPage * index, books.length));
    };

    const handleSearch = (event) => {
        if (event.target.value !== searchValue) dispatch(setSearchValue(event.target.value, initBooks));
    };

    const handleRefresh = () => {
        dispatch({ type: Actions.BOOK.REFRESH_FILTER });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        {
            loading ? (
                <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={72} color='secondary' />
            ) : (
            <>
                <GridContainer
                    justify="center"
                    alignContent="center"
                    alignItems="center"
                    direction="row"
                    style={{marginBottom: 15}}
                >
                    {
                        open && <AddBook open={open} handleClose={handleClose} />
                    }
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            id="book-search"
                            label="SEARCH"
                            fullWidth
                            onChange={handleSearch}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>,
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={2}>
                        <SortInput book label="Sort By" items={booksSort} defaultValue={0}/>
                    </GridItem>
                    {
                        Object.values(filterData).map((data, index) => {
                            return (
                                <FilterMenu key={index} label={data.label} items={data.data} onlyOne={data.onlyOne} type={data.type}/>
                            )
                        })
                    }
                </GridContainer> 
                <GridContainer justify="flex-end" style={{position: 'relative'}}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Button 
                            style={{margin: '0 auto', display: "flex"}}
                            disabled={loading || !filterApplied}
                            color="rose"
                            onClick={handleRefresh}
                        >
                            <RefreshIcon />
                            <span>Refresh filters</span>
                        </Button>
                    </GridItem>
                    <GridItem>
                    {
                        authenticated && (
                            <Tooltip title="Add new book">
                                <Button
                                    style={{position: 'absolute', right: 10, top: 0}}
                                    round
                                    color="rose"
                                    justIcon
                                    onClick={() => setOpen(true)}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        )
                    }
                    </GridItem>
                </GridContainer>
                <br />
                <GridContainer 
                    justify="flex-start"
                    direction="row"
                    alignContent="center"
                    alignItems="center"
                >
                    {
                        books.length === 0 ? 
                        (
                            (filterApplied || searchApplied) ?
                            <h2 style={{margin: '0 auto'}}>No book found by your custom search...</h2> : 
                            <h2 style={{margin: '0 auto'}}>No books added yet...</h2>
                        ) : (
                            books.slice(0, showedBooks).map((book, index) => {
                                return <BookContainer key={index} book={book} />
                            })
                        )
                    }
                </GridContainer> 
                <br />
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
            </>
            )
        }
        </div>
    );
};

export default AllBooks;
