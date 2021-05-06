import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AppIcon from '../images/icon.png';
import BackgrImage from '../images/backgr.jpg';
import '../css/App.css';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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
    forgotPassword: {
        position: 'absolute',
        left: '10%'
    },
    icon: {
        margin: '20px auto 0',
        width: 200
    },
    image: {
        backgroundImage: `url(${BackgrImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
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
    signUp: {
        position: 'absolute',
        right: '10%'
    },
    submitButton: {
        margin: '60px auto 20px',
        position: 'relative'
    }
});


const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { loading, authenticated } = useSelector((state) => state.user);
    const { errors } = useSelector((state) => state.ui);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (authenticated) {
            history.push("/");
        }
    }, [authenticated, errors]);

    const onSubmit = (formData) => {
        dispatch(loginUser(formData, history));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <Grid container>
            <Grid item xs className={classes.image} />
            <Grid item xs={6}>
                <div className={classes.form}>
                    <img src={AppIcon} alt="app-icon" className={classes.icon}/>
                    <Typography variant="h3" className={classes.siteName}>Serenity Craft</Typography>
                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                    <TextField                         
                        className={classes.textField} 
                        variant="outlined"
                        name="email" 
                        type="email" 
                        label="Email" 
                        error={errors.email ? true : false}
                        helperText={errors.email}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <br />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        label="Password" 
                        error={errors.password ? true : false}
                        helperText={errors.password}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <br />
                    <small className={classes.forgotPassword}>
                        <Link to="/resetPassword">Forgot your password? Reset it here.</Link>
                    </small>
                    <small className={classes.signUp}>
                        <Link to="/signup">New to Serenity? Create an account!</Link>
                    </small>
                    <br />
                    {
                        errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )
                    }
                    <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                        Login
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

export default Login;
