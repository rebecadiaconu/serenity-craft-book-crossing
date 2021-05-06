import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AppIcon from '../images/icon.png';
import BackgrImage from '../images/backgr.jpg';
import '../css/App.css';

// MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/actions/userActions';
import store from '../redux/store';
import { Actions } from "../redux/types";

const useStyles = makeStyles({
    backdrop: {
        zIndex: 3,
        color: '#fff',
    },
    customError: {
        color: 'red',
        fontSize: '0.9rem',
        paddingTop: 20
    },
    form: {
        padding: '40px 0',
        position: 'relative',
        margin: '100px auto',
        textAlign: 'center'
    },
    image: {
        backgroundImage: `url(${BackgrImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
    },
    info: {
        textAlign: 'left',
        margin: '10px auto',
        width: '80%'
    },
    icon: {
        margin: '0 auto',
        width: 150
    },
    pageTitle: {
        margin: '60px auto 40px'
    },
    progress: {
        position: 'absolute'
    },
    textField: {
        margin: '10px auto',
        width: '80%'
    },
    siteName: {
        marginTop: -20,
        fontFamily: 'Sacramento, cursive'
    },
    submitButton: {
        margin: '40px auto 20px',
        position: 'relative'
    }
});

const ResetPassword = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { errors, message, sendingEmail } = useSelector((state) => state.ui);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message !== '') setOpen(true);
        else setOpen(false);

    }, [errors, message]);

    const handleClose = () => {
        store.dispatch({ type: Actions.UI.CLEAR_ACTION });
        console.log(message);
        history.push('/login');
    }

    const onSubmit = (formData) => {
        dispatch(forgotPassword(formData));
    };

    return (
       <Grid container className={classes.image}>
        <Grid item xs/>
        <Grid item xs={4}>
            <Card className={classes.form}>
                <CardContent>
                    <img src={AppIcon} alt="app-icon" className={classes.icon}/>
                    <Typography variant="h3" className={classes.siteName}>Serenity Craft</Typography>
                    <Typography variant="h4" className={classes.pageTitle}>Reset your password</Typography>
                    <br />
                    <Typography variant="body1" className={classes.info}>Enter your user account's email address and we will send you a password reset link.</Typography>
                    <TextField                         
                        className={classes.textField} 
                        variant="outlined"
                        name="email" 
                        type="email" 
                        label="Email address" 
                        error={errors.email ? true : false}
                        helperText={errors.email}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <br />
                    {
                        errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={sendingEmail}>
                        Send password reset email
                        {
                            sendingEmail && (
                                <CircularProgress className={classes.progress} size={32} color='secondary' />
                            )
                        }
                    </Button>
                </CardActions>
            </Card>
            {
                !!message && (
                    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                        <Snackbar anchorOrigin={{ vertical: "center", horizontal: "center" }} open={open} onClose={handleClose}>
                            <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
                                Email sent - CHECK IT OUT!
                            </Alert>
                        </Snackbar>
                    </Backdrop>
                )
            }
        </Grid>
        <Grid item xs xs/>
       </Grid>
    )
}

export default ResetPassword
