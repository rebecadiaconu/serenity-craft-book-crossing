import React, { useState, useEffect, forwardRef } from 'react';
import { useForm } from 'react-hook-form';

// Redux
import { useSelector, useDispatch } from  "react-redux";
import { changeEmail, changeUsername, changePassword, deleteAccount } from 'redux/actions/userActions';

// Components

// template
import Button from "components-template/CustomButtons/Button";

// @material-ui core
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    makeStyles,
    Slide,
    Tooltip
 } from "@material-ui/core";
 import TextField from "@material-ui/core/TextField";


// icons
import Close from "@material-ui/icons/Close";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// Styles
import styles from "assets/jss/serenity-craft/components/settings";
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Settings = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { credentials, books, crossings } = useSelector((state) => state.user);
    const { errors } = useSelector((state) => state.ui);

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);
    const [usernameAlert, setUsernameAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

    useEffect(() => {
        setValue('newUsername', credentials.username);
        setValue('newEmail', credentials.email);
    }, [credentials]);

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

    const handlePasswordChange = (formData) => {
        dispatch(changePassword(formData));
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleDeleteAccount = (formData) => {
        let userReq = crossings.filter((crossing) => crossing.sender === credentials.username && crossing.status === "pending");
        dispatch(deleteAccount(formData, books, userReq));
    };

    return (
        <div>
            <List>
                <Tooltip 
                    arrow
                    interactive
                    title="After every change you will be logged out for validation"
                    className={classes.toolTip}
                >
                    <IconButton aria-label="Every time you make an account change you will be logged out for validation!">
                        <ErrorOutlineIcon />
                    </IconButton>
                </Tooltip>
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
                        onClick={() => setPasswordAlert(true)}
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
                        onClick={() => setDeleteAlert(true)}
                    >
                        <HighlightOffIcon />
                        DELETE ACCOUNT
                    </Button>
                </ListItem>
            </List>
            {/* Confirm changes modals */}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                    <h4 className={classes.modalTitle}>Type in your password to confirm the changes</h4>
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        required
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
                                onClick={() => setShowPassword(!showPassword)}
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
                        Sounds good
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={passwordAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setEmailAlert(false)}
                aria-labelledby="password-alert"
                aria-describedby="password-alert"
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
                        onClick={() => setPasswordAlert(false)}
                    >
                        <Close />
                    </Button>
                    <h4 className={classes.modalTitle}>Type in your new password and confirm the changes</h4>
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        label="Old Password" 
                        error={errors?.password ? true : false}
                        helperText={errors?.password}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="newPassword" 
                        type={showNewPassword ? "text" : "password"} 
                        label="New Password" 
                        error={errors?.newPassword ? true : false}
                        helperText={errors?.newPassword}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                onMouseDown={handleMouseDownPassword}
                                >
                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions className={classes.actionContainer}>
                    <Button
                        onClick={() => setPasswordAlert(false)}
                        color="danger"
                        round
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        round
                        onClick={handleSubmit(handlePasswordChange)}
                    >
                        Sounds Good
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setDeleteAlert(false)}
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
                        onClick={() => setDeleteAlert(false)}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                        onClick={() => setDeleteAlert(false)}
                        color="danger"
                        round
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        round
                        onClick={handleSubmit(handleDeleteAccount)}
                    >
                        Sounds Good
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default Settings;
