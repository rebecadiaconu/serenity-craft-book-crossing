import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AppIcon from '../images/icon.png';
import BackgrImage from '../images/backgr.jpg';
import '../css/App.css';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/userActions';
import { Actions } from '../redux/types';

// MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

// Styles
const useStyles = makeStyles({
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    form: {
        padding: '60px 0',
        position: 'relative',
        textAlign: 'center'
    },
    icon: {
        margin: '0 auto',
        width: 150
    },
    image: {
        backgroundImage: `url(${BackgrImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
    },
    pageTitle: {
        margin: '40px auto 40px'
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
        margin: '60px auto 20px',
        position: 'relative'
    }
});


const Signup = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { loading, authenticated } = useSelector((state) => state.user);
    const { errors } = useSelector((state) => state.ui);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmed, setShowConfirmed] = useState(false)

    useEffect(() => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        console.log('sedfefrg => ',errors);
    }, []);

    useEffect(() => {
        console.log(errors);
        if (authenticated) {
            history.push("/");
        }
    }, [authenticated, errors]);

    const onSubmit = (formData) => {
        dispatch(signUp(formData, history));
    };

    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmed = (event) => {
        event.preventDefault();
        setShowConfirmed(!showConfirmed);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container>
            <Grid item xs className={classes.image} />
            <Grid item xs={6}>
                <div className={classes.form}>
                    <img src={AppIcon} alt="app-icon" className={classes.icon}/>
                    <Typography variant="h3" className={classes.siteName}>Serenity Craft</Typography>
                    <Typography variant="h3" className={classes.pageTitle}>Signup</Typography>
                    <TextField                         
                        className={classes.textField} 
                        variant="outlined"
                        name="email" 
                        type="email" 
                        label="Email" 
                        error={errors?.email ? true : false}
                        helperText={errors?.email}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <br />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="password" 
                        type={showPassword? "text" : "password"} 
                        label="Password" 
                        error={errors?.password ? true : false}
                        helperText={errors?.password}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDown}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <br />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="confirmPassword" 
                        type={showConfirmed ? "text" : "password"} 
                        label="Confirm your password" 
                        error={errors?.confirmPassword ? true : false}
                        helperText={errors?.confirmPassword}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmed}
                                onMouseDown={handleMouseDown}
                                >
                                    {showConfirmed ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    /><br />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="username" 
                        type="text" 
                        label="Username" 
                        error={errors?.username ? true : false}
                        helperText={errors?.username}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <br />
                    <small>
                        <Link to="/login">Already have an account? Log in!</Link>
                    </small>
                    <br />
                    {
                        errors?.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )
                    }
                    <Button onMouseDown={handleMouseDown} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                        Signup
                        {
                            loading && (
                                <CircularProgress className={classes.progress} size={32} color='secondary' />
                            )
                        }
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default Signup;
