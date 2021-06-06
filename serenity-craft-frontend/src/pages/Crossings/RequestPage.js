import React, { useEffect, useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { markRequestsRead } from "redux/actions/crossingActions";
import { Actions } from "redux/types";

// Components

// template
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import RequestCard from 'components-serenity/User/RequestCard';

// @material-ui core
import { Typography, makeStyles } from '@material-ui/core';

// Styles
import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useAlert = makeStyles(alertStyles);

const RequestPage = () => {
    const alertClasses = useAlert();
    const dispatch = useDispatch();
    const { requests } = useSelector((state) => state.user);
    const { message, errors } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);

    useEffect(() =>{
        return () =>  dispatch({ type: Actions.UI.CLEAR_ACTION });
    }, []);

    useEffect(() => {
        if (requests && requests.length > 0) {
            let unreadRequestsIds = requests.filter((req) => !req.read).map((req) => req.crossingId);
            if (unreadRequestsIds.length > 0) dispatch(markRequestsRead(unreadRequestsIds));
        }
    }, [requests]);

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
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
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
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {error}
            </SweetAlert>
        );
    };
    

    return (
        <GridContainer
            justify="center"
            alignItems="center"
            alignContent="center"
        >
            {alert}
            <GridItem xs={12} sm={12} md={12}>
            <Typography variant="h3" style={{fontFamily: "'Sacramento', cursive", textAlign: "center"}}>
                Your crossing requests
            </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            {
                (requests && requests.length > 0) ? (
                    requests.map((req) => {
                        return <RequestCard key={req.crossingId} req={req} />
                    })
                ) : <h4 style={{textAlign: 'center', marginTop: 20}}>You have no crossing requests yet...</h4>
            }
            </GridItem>
        </GridContainer>
    )
}

export default RequestPage;
