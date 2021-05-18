import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { Actions } from "../../redux/types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


// @material-ui/icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TypographyDanger from "components/Typography/Danger.js";
import { Typography } from '@material-ui/core';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import AppIcon from "assets/img/icon.png";

const useStyles = makeStyles(styles);

const LoginPage = () => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { authenticated } = useSelector((state) => state.user);
  const { errors } = useSelector((state) => state.ui);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch({ type: Actions.UI.CLEAR_ERRORS });
  }, []);

  // useEffect(() => {
  //     console.log(errors);
  //     if (authenticated) {
  //         history.push("/");
  //     }
  // }, [authenticated, errors]);

  useEffect(() => {
    let id = setTimeout(function() {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={6}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <div className={classes.center}>
                  <img src={AppIcon} alt="app-icon" className={classes.icon}/>
                  <Typography variant="h3" className={classes.siteName}>Serenity Craft</Typography>
                </div>
                <h4 className={classes.cardTitle}>LOG IN</h4>
                {/* <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div> */}
              </CardHeader>
              <CardBody>
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
                        type={showPassword ? "text" : "password"} 
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
                                onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
              <br />
              <Typography className={classes.forgotPassword}>
                  <Link to="/auth/reset-password">Forgot your password?</Link>
              </Typography>
              <Typography className={classes.signUp}>
                  <Link to="/auth/register-page">New to Serenity? Sign up!</Link>
              </Typography>
                <br />
                {
                    errors?.general && (
                        <TypographyDanger variant="body2">
                            {errors.general}
                        </TypographyDanger>
                    )
                }
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button onClick={handleSubmit(onSubmit)} type="submit" color="rose" simple size="lg" block>
                 Let{`'`}s go!
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default LoginPage;
