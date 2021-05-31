import React from 'react';
import { booksSort } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAnyUser } from "redux/actions/userActions";
import { setSearchValue } from "redux/actions/bookActions";
import { Actions } from 'redux/types';

// @material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Textfield from "@material-ui/core/Textfield";
import { makeStyles } from "@material-ui/core/styles";

// core components
import SortInput from "util/components/SortInput";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";

// @material-ui icons
import Search from "@material-ui/icons/Search";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Style
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import CardFooter from 'components/Card/CardFooter';
import GridContainer from 'components/Grid/GridContainer';

const userStyles = {
    ...styles,
    cardTitle,
    user: {
        fontFamily: "'Grandstander', cursive"
    },
    email: {
        color: "inherit",
        "& h4": {
        marginBottom: "0px",
        marginTop: "0px"
        }
    },
    location: {
        color: "#999999",
        fontSize: "12px",
        lineHeight: "22px",
        display: "inline-flex",
        "& svg": {
          position: "relative",
          top: "4px",
          width: "16px",
          height: "16px",
          marginRight: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
          position: "relative",
          top: "4px",
          fontSize: "16px",
          marginRight: "3px"
        }
      },
    cardCategory: {
        margin: "0 auto",
        color: "#999999"
    }
}

const useStyles = makeStyles(userStyles);

const UserCard = ({ user, search }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { initBooks, books, searchValue } = useSelector((state) => state.books);

    const handleSearch = (event) => {
        if (event.target.value !== searchValue) dispatch(setSearchValue(event.target.value, initBooks));
    };


    return (
        <GridItem xs={12} sm={12} md={4}>
            <Card profile>
                <CardAvatar profile>
                    <img style={{objectFit: "cover"}} src={user.imageUrl} alt={user.username} />
                </CardAvatar>
                <CardBody profile>
                <h3 className={classes.user}>{user.username}</h3>
                {
                    user?.bio ? <p className={classes.description}>{user.bio}</p> : null
                }
                {
                    user?.mainInterests ? (
                        <>
                        <h4 className={classes.user}>I'm interested in: </h4>
                        {
                            user.mainInterests.map((item, index) => {
                                return (
                                    <Button round color="primary" size="sm" key={index}>{item}</Button>
                                )
                            })
                        }
                        </>
                    ) : null
                }
                </CardBody>
                <CardFooter>
                    <div className={classes.location}>
                        <AlternateEmailIcon />
                        <span>{user.email}</span>
                    </div>
                    {
                        user?.location ? (
                            <div className={classes.location}>
                                <LocationOnIcon />
                                <span>{user.location}</span>
                            </div>
                        ) : null
                    }
                </CardFooter>
            </Card>
            {
                search ? (
                    <GridContainer
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                    >
                        <GridItem xs={12} sm={6} md={7}>
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
                        <GridItem xs={12} sm={6} md={5}>
                            <SortInput book label="Sort By" items={booksSort} defaultValue={0}/>
                        </GridItem>
                    </GridContainer>
                ) : null
            }
        </GridItem>
    )
}

export default UserCard;
