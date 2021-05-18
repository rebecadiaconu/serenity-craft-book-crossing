import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

// core components
import Settings from "../../components serenity/Settings";
import EditProfile from "../../components serenity/EditProfile";
import BooksCarousel from "../../components serenity/BooksCarousel";
import CrossingsCarousel from "../../components serenity/CrossingsCarousel";
import UserCard from "../../components serenity/UserCard";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import NavPills from "components/NavPills/NavPills.js";

// Style
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { defaultUserImage } from 'util/general';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Actions } from 'redux/types';

const userStyles = {
    ...styles,
    ...alertStyles,
    cardTitle,
    cardCategory: {
        margin: "0",
        color: "#999999"
    }
}

const useStyles = makeStyles(userStyles);

const UserAuthPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { credentials, books, crossings } = useSelector((state) => state.user);
    // const [userImage, setUserImage] = useState(defaultUserImage);

    // useEffect(() => {
    //     setUserImage(credentials.imageUrl);
    // }, [credentials.imageUrl]);


    return (
        <div>
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
            >   
                <UserCard credentials={credentials} />
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardBody>
                            <NavPills 
                                color="rose"
                                horizontal={{
                                    tabsGrid: { xs: 12, sm: 12, md: 2 },
                                    contentGrid: { xs: 12, sm: 12, md: 10 }
                                }}
                                tabs={[
                                    {
                                        tabButton: "Edit profile",
                                        tabIcon: EditIcon,
                                        tabContent: (
                                            <EditProfile />
                                        )
                                    },
                                    {
                                        tabButton: "Settings",
                                        tabIcon: SettingsIcon,
                                        tabContent: (
                                            <Settings />
                                        )
                                    }
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <BooksCarousel />
                <CrossingsCarousel />
            </GridContainer>
        </div>
    );
}

export default UserAuthPage;
