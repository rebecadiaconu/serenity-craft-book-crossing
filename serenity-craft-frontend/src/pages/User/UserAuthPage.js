import React, { useEffect, useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserData, logOutUser } from "redux/actions/userActions";
import { Actions } from 'redux/types';

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

// @material-ui core
import { makeStyles } from "@material-ui/core";

// icons
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

// Styles
import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useAlert = makeStyles(alertStyles);


const UserAuthPage = () => {
    const alertClasses = useAlert();
    const dispatch = useDispatch();
    const { credentials, authenticated } = useSelector(state => state.user);
    const { errors, message, settings } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (authenticated) dispatch(getUserData());
        return () => dispatch({ type: Actions.UI.CLEAR_ACTION });
    }, []);

    useEffect(() => {
        if (message) successAlert(message);
    }, [message]);

    useEffect(() => {
        if (errors?.error) errorAlert(errors.error);
    }, [errors]);

    const successAlert = (text) => {
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Done!"
                onConfirm={() => {
                    setAlert(null);
                    if (settings) {
                        dispatch(logOutUser());
                    } else dispatch({ type: Actions.UI.CLEAR_ACTION });
                }}
                onCancel={() => {
                    setAlert(null);
                    if (settings) {
                        dispatch(logOutUser());
                    } else dispatch({ type: Actions.UI.CLEAR_ACTION });
                }}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {text}
            </SweetAlert>
        );
    };

    const errorAlert = (error) => {
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Error"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {error}
            </SweetAlert>
        );
    };
	
	const hideAlert = () => {
        setAlert(null);
        if (settings) {
            dispatch({ type: Actions.UI.STOP_SETTINGS });
        } else dispatch({ type: Actions.UI.CLEAR_ACTION });
    };

    return (
        <div>
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
            >   
                {alert}
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
