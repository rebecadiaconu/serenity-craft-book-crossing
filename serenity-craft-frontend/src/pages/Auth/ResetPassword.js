import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import history from "util/history";
import SweetAlert from "react-bootstrap-sweetalert";
import AppIcon from "assets/img/icon.png";

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions';
import { Actions } from "../../redux/types";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import CardHeader from "components-template/Card/CardHeader.js";
import CardFooter from "components-template/Card/CardFooter.js";
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";
import TypographyDanger from "components-template/Typography/Danger.js";

// @material-ui/core 
import { 
  CircularProgress,
  InputAdornment,
  makeStyles,
  Typography
 } from "@material-ui/core";
 import TextField from "@material-ui/core/TextField";

// icons
import EmailIcon from '@material-ui/icons/Email';

// Styles
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import stylesSweet from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useStyles = makeStyles(styles);
const alertStyles = makeStyles(stylesSweet);

const ResetPassword = () => {
  const classes = useStyles();
  const sweetClasses = alertStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { authenticated } = useSelector((state) => state.user);
  const { errors, message, sendingEmail } = useSelector((state) => state.ui);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

    useEffect(() => {
      dispatch({ type: Actions.UI.CLEAR_ERRORS });
    }, []);

    useEffect(() => {
      if (message !== '') console.log(message);

    }, [errors, message]);

    useEffect(() => {
      if (authenticated) {
          history.push("/");
      }
    }, [authenticated, errors]);

    useEffect(() => {
      let id = setTimeout(function() {
        setCardAnimation("");
      }, 700);

      return function cleanup() {
        window.clearTimeout(id);
      };
    });

    const onSubmit = (formData) => {
      dispatch(forgotPassword(formData));
    };

    const handleClose = () => {
      dispatch({ type: Actions.UI.CLEAR_ACTION });
      history.push('/auth/login-page');
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
                  <h4 className={classes.cardTitle}>Reset password</h4>
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
                    InputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>)
                    }}
                  />
                  <br />
                  {
                    errors?.general && (
                      <TypographyDanger variant="body2" className={classes.justifyContentCenter}>
                        {errors.general}
                      </TypographyDanger>
                    )
                  }
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button onClick={handleSubmit(onSubmit)} type="submit" color="rose" simple size="lg" block>
                    Send password reset email
                    {
                      sendingEmail && (
                        <CircularProgress className={classes.progress} size={32} color='secondary' />
                      )
                    }
                  </Button>
                </CardFooter>
              </Card>
              {
                !!message && (
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Email sent!"
                    onConfirm={() => handleClose()}
                    onCancel={() => handleClose()}
                    confirmBtnCssClass={sweetClasses.button + " " + sweetClasses.success}
                  >
                    Go check it!
                  </SweetAlert>
                )
              }
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
}

export default ResetPassword;
