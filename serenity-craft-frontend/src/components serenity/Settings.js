import React from 'react';
import { useForm } from 'react-hook-form';

// Redux
import { useSelector, useDispatch } from  "react-redux";

// @material-ui core
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Textfield from "@material-ui/core/Textfield";

// @material-ui/icons
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// components
import Button from "components/CustomButtons/Button";

// Styles
import styles from "assets/jss/serenity-craft/pages/settings";
const useStyles = makeStyles(styles);


const Settings = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const { credentials } = useSelector((state) => state.user);
    const { errors, message, loading } = useSelector((state) => state.ui);

    return (
       <List>
        <ListItem>
            <Textfield
                color="secondary"
                name="email" 
                type="email" 
                label="Email" 
                variant="outlined"
                // error={errors?.email ? true : false}
                // helperText={errors?.email}
                // inputRef={register()}
                InputLabelProps={{ shrink: true }}  
                fullWidth
                value={credentials.email}
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
                // onClick={handleChangeEmail}
            >
                CHANGE
            </Button>
        </ListItem>
        <ListItem>
            <Textfield
                color="secondary"
                name="username" 
                type="text" 
                label="Username"
                variant="outlined"
                // error={errors?.email ? true : false}
                // helperText={errors?.email}
                // inputRef={register()}
                InputLabelProps={{ shrink: true }}  
                fullWidth
                type="text"
                value={credentials.username}
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
                // onClick={handleChangeUsername}
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
                // onClick={handleChangePassword}
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
                // onClick={handleDeleteAccount}
                style={{width: 200}}
                className={classes.central}
            >
                <HighlightOffIcon />
                DELETE ACCOUNT
            </Button>
        </ListItem>
       </List>
    )
}

export default Settings;
