import React, { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "redux/actions/userActions";

// Components

// template
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";
import NavPills from "components-template/NavPills/NavPills.js";

// serenity
import BooksCarousel from "components-serenity/Book/BooksCarousel";
import CrossingsCarousel from "components-serenity/Crossing/CrossingsCarousel";
import EditProfile from "components-serenity/User/EditProfile";
import Settings from "components-serenity/User/Settings";
import UserCard from "components-serenity/User/UserCard";

// icons
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

const UserAuthPage = () => {
    const dispatch = useDispatch();
    const { credentials } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserData());
    }, [])

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
