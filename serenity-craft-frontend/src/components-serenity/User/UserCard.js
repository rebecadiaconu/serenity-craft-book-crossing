import React from 'react';
import { booksSort } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "redux/actions/bookActions";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card.js";
import CardAvatar from "components-template/Card/CardAvatar.js";
import CardBody from "components-template/Card/CardBody.js";
import CardFooter from 'components-template/Card/CardFooter';
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from "components-template/Grid/GridItem.js";

// serenity
import SortInput from "util/components/SortInput";

// @material-ui core
import { CircularProgress, InputAdornment, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"

// icons
import Search from "@material-ui/icons/Search";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Style
import userStyles from "assets/jss/serenity-craft/components/user/userCardStyle";
const useStyles = makeStyles(userStyles);

const UserCard = ({ user, search }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { initBooks, books, searchValue } = useSelector((state) => state.books);
    const { loadingDetails, loadingImage } = useSelector((state) => state.user);

    const handleSearch = (event) => {
        if (event.target.value !== searchValue) dispatch(setSearchValue(event.target.value, initBooks));
    };


    return (
        <GridItem xs={12} sm={12} md={4}>
            <Card profile>
            {
                loadingDetails ? (
                    <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={50} color='secondary' />
                ) : (
                <>
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
                </>
                )
            }
            </Card>
            {
                search ? (
                    <GridContainer
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                    >
                        <GridItem xs={12} sm={6} md={7}>
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
