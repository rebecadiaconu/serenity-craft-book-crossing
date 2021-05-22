import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from 'redux/types';

// @material-ui components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

// core components
import Settings from "../../components serenity/User/Settings";
import EditProfile from "../../components serenity/User/EditProfile";
import BooksCarousel from "../../components serenity/Book/BooksCarousel";
import CrossingsCarousel from "../../components serenity/Crossing/CrossingsCarousel";
import UserCard from "../../components serenity/User/UserCard";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import NavPills from "components/NavPills/NavPills.js";

const UserAuthPage = () => {
    const { credentials } = useSelector(state => state.user);

    return (
        <div>
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
            >   
                <UserCard user={credentials} />
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
                                        tabButton: "Edit",
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
                <CrossingsCarousel />
                <BooksCarousel />
            </GridContainer>
        </div>
    );
}

export default UserAuthPage;
