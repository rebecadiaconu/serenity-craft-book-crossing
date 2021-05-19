import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Redux
import { useSelector, useDispatch } from  "react-redux";
import { useHistory } from "react-router-dom";
import { changeEmail, changeUsername } from '../../redux/actions/userActions';
import { Actions } from 'redux/types';

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui core
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// components
import Button from "components/CustomButtons/Button";

// Styles
import styles from "assets/jss/serenity-craft/pages/settings";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Settings = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { credentials } = useSelector((state) => state.user);
    const { errors, loading } = useSelector((state) => state.ui);

    const [showPassword, setShowPassword] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);
    const [usernameAlert, setUsernameAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);

    useEffect(() => {
        setValue('newUsername', credentials.username);
        setValue('newEmail', credentials.email);
    }, [credentials.email, credentials.username]);

    const handleEmailChange = (formData) => {
        if (formData.newEmail !== credentials.email) {
            dispatch(changeEmail(formData));
        }
    };

    const handleUsernameChange = (formData) => {
        if (formData.newUsername !== credentials.username) {
            dispatch(changeUsername(formData));
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <List>
                <ListItem>
                    <TextField
                        color="secondary"
                        name="newEmail" 
                        type="email" 
                        label="Email" 
                        variant="outlined"
                        error={errors?.newEmail ? true : false}
                        helperText={errors?.newEmail}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <EmailIcon />
                                </InputAdornment>,
                        }}
                    />
                    <Button
                        size="lg"
                        round
                        color="info"
                        className={classes.button}
                        onClick={() => setEmailAlert(true)}
                    >
                        CHANGE
                    </Button>
                </ListItem>
                <ListItem>
                    <TextField
                        color="secondary"
                        name="newUsername" 
                        type="text" 
                        label="Username"
                        variant="outlined"
                        error={errors?.newUsername ? true : false}
                        helperText={errors?.newUsername}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        type="text"
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <FaceIcon />
                                </InputAdornment>,
                        }}
                    />
                    <Button
                        size="lg"
                        round
                        color="info"
                        className={classes.button}
                        onClick={() => setUsernameAlert(true)}
                    >
                        CHANGE
                    </Button>
                </ListItem>
                <Divider style={{margin: '10px 0'}} />
                <ListItem>
                    <Button
                        size="lg"
                        round
                        color="info"
                        style={{width: 200}}
                        className={classes.central}
                    >
                        CHANGE PASSWORD
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        size="lg"
                        round
                        color="danger"
                        style={{width: 200}}
                        className={classes.central}
                    >
                        <HighlightOffIcon />
                        DELETE ACCOUNT
                    </Button>
                </ListItem>
            </List>
            <Dialog
                open={emailAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setEmailAlert(false)}
                aria-labelledby="email-alert"
                aria-describedby="email-alert"
            >
                <DialogTitle
                    id="notice-modal-slide-title"
                    disableTypography
                >
                    <Button
                        justIcon
                        className={classes.closeButton}
                        key="close"
                        aria-label="Close"
                        color="transparent"
                        onClick={() => setEmailAlert(false)}
                    >
                        <Close />
                    </Button>
                    <h4 className={classes.modalTitle}>Type in your password to confirm the changes</h4>
                </DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions className={classes.actionContainer}>
                    <Button
                        onClick={() => setEmailAlert(false)}
                        color="danger"
                        round
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        round
                        onClick={handleSubmit(handleEmailChange)}
                    >
                        Sounds Good
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={usernameAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setUsernameAlert(false)}
                aria-labelledby="username-alert"
                aria-describedby="username-alert"
            >
                <DialogTitle
                    disableTypography
                >
                    <Button
                        justIcon
                        className={classes.closeButton}
                        key="close"
                        aria-label="Close"
                        color="transparent"
                        onClick={() => setUsernameAlert(false)}
                    >
                        <Close />
                    </Button>
                    <h4 className={classes.modalTitle}>Are you sure?</h4>
                </DialogTitle>
                <DialogActions className={classes.actionContainer}>
                    <Button
                        onClick={() => setUsernameAlert(false)}
                        color="danger"
                        round
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        round
                        onClick={handleSubmit(handleUsernameChange)}
                    >
                        Let's do this!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Settings;
