import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import history from "util/history";
import AppIcon from "assets/img/icon.png";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/userActions';
import { Actions } from "../../redux/types";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";
import InfoArea from "components-template/InfoArea/InfoArea.js";

// @material-ui/core
import { 
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography
 } from '@material-ui/core';
 import TextField from "@material-ui/core/TextField";

// icons
import Timeline from "@material-ui/icons/Timeline";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { authenticated } = useSelector((state) => state.user);
  const { errors, loadingButton } = useSelector((state) => state.ui);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);

  useEffect(() => {
    return () => dispatch({ type: Actions.UI.CLEAR_ERRORS });
  }, []);

  useEffect(() => {
    if (authenticated) {
      history.push("/admin/all-books");
    }
  }, [authenticated]);

  const onSubmit = (formData) => {
    dispatch(signUp(formData));
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
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes.cardSignup}>
            <div className={classes.center}>
              <img src={AppIcon} alt="app-icon" className={classes.icon}/>
              <Typography variant="h3" className={classes.siteName}>Serenity Craft</Typography>
            </div>
            <h3 className={classes.cardTitle}>Register</h3>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={5}>
                  <InfoArea
                    title="Socialize"
                    description="Meet new people in love with your books everyday."
                    icon={Timeline}
                    iconColor="primary"
                  />
                  <InfoArea
                    title="A nice gesture to our planet"
                    description="We've developed the website to encourage book crossings. The less wasted paper, the healthier the planet."
                    icon={LoyaltyIcon}
                    iconColor="rose"
                  />
                </GridItem>
                <GridItem xs={12} sm={8} md={5}>
                <TextField                         
                  className={classes.textField} 
                  variant="outlined"
                  name="email" 
                  type="email" 
                  label="*Email" 
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
                  label="*Password" 
                  error={errors?.password ? true : false}
                  helperText={errors?.password}
                  inputRef={register()}
                  InputLabelProps={{ shrink: true }}  
                  fullWidth
                  InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDown}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
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
                />
                <br />
                <TextField 
                  className={classes.textField} 
                  variant="outlined"
                  name="username" 
                  type="text" 
                  label="*Username" 
                  error={errors?.username ? true : false}
                  helperText={errors?.username}
                  inputRef={register()}
                  InputLabelProps={{ shrink: true }}  
                  fullWidth
                />
                <br />
                <Typography className={classes.center} style={{fontSize: "small"}}>
                  <Link to="/auth/login-page">Already have an account? Log in!</Link>
                </Typography>
                <br />
                {
                  errors?.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )
                }
                <div className={classes.center}>
                  <Button disabled={loadingButton} onClick={handleSubmit(onSubmit)} onMouseDown={handleMouseDown} type="submit" className={classes.submitButton} round color="primary">
                    Get started
                    {
                      loadingButton && (
                        <CircularProgress style={{position: 'absolute'}} size={32} color='secondary' />
                      )
                    }
                  </Button>
                </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


export default RegisterPage;