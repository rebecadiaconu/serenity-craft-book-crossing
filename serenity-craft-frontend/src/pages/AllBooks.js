import React, { useState, useEffect } from "react";
import { booksSort } from "../util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, setSearchValue } from "../redux/actions/booksActions";
import { getFilterData } from "../util/general";
import { Actions } from "../redux/types";

// @material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Textfield from "@material-ui/core/Textfield";

import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// core components
import SelectInput from "../util/components/SelectInput";
import FilterMenu from "../util/components/FilterMenu";
import Button from "../components/CustomButtons/Button";
import BookContainer from "../components serenity/Book/BookContainer";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


const AllBooks = () => {
    const dispatch = useDispatch();
    const { initBooks, books, filterApplied, searchApplied, searchValue } = useSelector((state) => state.books);
    const { loading } = useSelector((state) => state.ui);
    const booksPerPage = 12;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));
    const [filterData, setFilters] = useState({});

    useEffect(() => {
        dispatch(getAllBooks());
    }, []);

    useEffect(() => {
        setFilters(getFilterData(initBooks));
    }, [initBooks]);

    useEffect(() => {
        setShowed(Math.min(booksPerPage * index, books.length));
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

    return (
        <div>
            <GridContainer
                justify="center"
                alignItems="center"
                alignItems="center"
                direction="row"
                style={{marginBottom: 15}}
            >
                <GridItem xs={12} sm={12} md={4}>
                    <Textfield
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
                    <SelectInput label="Sort By" items={booksSort} defaultValue={0}/>
                </GridItem>
                {
                    Object.values(filterData).map((data, index) => {
                        return (
                             <FilterMenu key={index} label={data.label} items={data.data} onlyOne={data.onlyOne} type={data.type}/>
                        )
                    })
                }
                <Button 
                    style={{margin: '0 auto', display: "flex"}}
                    disabled={loading || !filterApplied}
                    color="rose"
                    onClick={handleRefresh}
                >
                    <RefreshIcon />
                    <span>Refresh filters</span>
                </Button>
            </GridContainer> 
            <br />
            <GridContainer 
                justify="space-between"
                alignItems="center"
                direction="row"
            >
                {
                    books.length === 0 ? 
                    (
                        filterApplied ?
                        <h2 style={{margin: '0 auto'}}>No book found by your custom search...</h2> : 
                        <h2 style={{margin: '0 auto'}}>No books added yet...</h2>
                    ) : (
                        books.slice(0, showedBooks).map((book, index) => {
                            return book.available ? <BookContainer key={index} book={book} /> :   null
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
        </div>
    );
};

export default AllBooks;
