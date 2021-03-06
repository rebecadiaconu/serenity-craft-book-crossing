import React, { useEffect, useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "redux/actions/userActions";
import { markRequestsRead } from "redux/actions/crossingActions";
import { Actions } from "redux/types";

// Components

// template
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import RequestCard from 'components-serenity/Crossing/RequestCard';

// @material-ui core
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';

// Styles
import alertStyles from "assets/jss/serenity-craft/util/sweetAlertStyle.js";
const useAlert = makeStyles(alertStyles);

const RequestPage = () => {
    const alertClasses = useAlert();
    const dispatch = useDispatch();
    const { requests } = useSelector((state) => state.user);
    const { message, errors, loading, seeRequest, request } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);

    useEffect(() =>{
        dispatch(getRequests());
        return () =>  dispatch({ type: Actions.UI.CLEAR_ACTION });
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
                    dispatch({ type: Actions.UI.CLEAR_ACTION });
                }}
                onCancel={() => {
                    setAlert(null);
                    dispatch({ type: Actions.UI.CLEAR_ACTION });
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
                onConfirm={() => {
                    setAlert(null);
                    dispatch({ type: Actions.UI.CLEAR_ACTION });
                }}
                onCancel={() => {
                    setAlert(null);
                    dispatch({ type: Actions.UI.CLEAR_ACTION });
                }}
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
            {
                loading && !(seeRequest && request) ? (
                    <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={72} color='secondary' />
                ) : (
                <>
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
                </> 
                )
            }
        </GridContainer>
    )
}

export default RequestPage;
