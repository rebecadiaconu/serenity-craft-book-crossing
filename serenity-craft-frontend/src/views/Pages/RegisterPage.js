import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/userActions';
import { Actions } from "../../redux/types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import AppIcon from "assets/img/icon.png";

const useStyles = makeStyles(styles);

const RegisterPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { authenticated } = useSelector((state) => state.user);
  const { errors } = useSelector((state) => state.ui);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);

  useEffect(() => {
    console.log('ceveerb');
    dispatch({ type: Actions.UI.CLEAR_ERRORS });
  }, []);

  // useEffect(() => {
  //     console.log(errors);
  //     if (authenticated) {
  //         history.push("/");
  //     }
  // }, [authenticated, errors]);

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
                    description="We've developed the website to encourage book crossings. The less wasted paper, the more healthy planet."
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
                      <Button onClick={handleSubmit(onSubmit)} onMouseDown={handleMouseDown} type="submit" className={classes.submitButton} round color="primary">
                        Get started
                      </Button>
                    </div>
                  {/* </form> */}
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