import React, { useState, useEffect } from "react";
import { booksSort } from "../util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../redux/actions/booksActions";
import { getFilterData } from "../util/general";
import { Actions } from "../redux/types";

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import SelectInput from "../util/components/SelectInput";
import FilterMenu from "../util/components/FilterMenu";
import Button from "../components/CustomButtons/Button";
import BookContainer from "../components serenity/BookContainer";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// Style
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const AllBooks = () => {
    const dispatch = useDispatch();
    const { initBooks, books, filterApplied } = useSelector((state) => state.books);
    const { loading } = useSelector((state) => state.ui);
    const booksPerPage = 12;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));
    const [filterData, setFilterData] = useState({});

    useEffect(() => {
        dispatch(getAllBooks());
    }, []);

    useEffect(() => {
        setFilterData(getFilterData(initBooks));
    }, [initBooks]);

    useEffect(() => {
        setShowed(Math.min(booksPerPage * index, books.length));
    }, [books]);

    const handleShowMore = (event) => {
        event.preventDefault();
        setIndex(index + 1);
        setShowed(Math.min(booksPerPage * index, books.length));
    };

    const handleRefresh = () => {
        dispatch({ type: Actions.BOOK.REFRESH_FILTER });
    };

    return (
        <div>
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
                    disabled={loading}
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
