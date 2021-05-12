import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../redux/actions/booksActions";

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import FilterListIcon from '@material-ui/icons/FilterList';
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
import ScrollToTop from "../util/components/ScrollToTop";
import Button from "../components/CustomButtons/Button";
import BookContainer from "../components serenity/BookContainer";
import GridContainer from "components/Grid/GridContainer.js";

// Style
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

const AllBooks = () => {
    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.books);
    const { scrolling } = useSelector((state) => state.ui);
    const booksPerPage = 3;
    const [index, setIndex] = useState(1);
    const [showedBooks, setShowed] = useState(Math.min(booksPerPage, books.length));

    useEffect(() => {
            dispatch(getAllBooks());
    }, []);

    useEffect(() => {
        setShowed(Math.min(booksPerPage * index, books.length));
    }, [books])


    const handleShowMore = (event) => {
        event.preventDefault();
        setIndex(index + 1);
        setShowed(Math.min(booksPerPage * index, books.length));
    };

    

    return (
        <div>
            <h3>Filtering...</h3>
            <br />
            <GridContainer 
                justify="space-between"
                alignItems="center"
                direction="row"
            >
                {
                    books.length === 0 ? 
                    <h2>No books added yet...</h2> : (
                        books.slice(0, showedBooks).map((book, index) => {
                            return <BookContainer key={index} book={book} />
                        })
                    )
                }
            </GridContainer> 
            <br /> 
            <ScrollToTop show={scrolling} />
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
        </div>
    );
};

export default AllBooks;
