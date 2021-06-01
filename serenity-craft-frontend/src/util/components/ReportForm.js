import React, { forwardRef, useEffect, useState } from 'react';
import featherLogo from "assets/img/feather-logo.png";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { addReport} from "redux/actions/userActions";
import { Actions } from 'redux/types';

// @material-ui core
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from '@material-ui/core';


// Components
import Danger from "components/Typography/Danger.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";

// Styles
import styles from "assets/jss/serenity-craft/components/addForm"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ReportForm = ({ open, items, type, username, userImage, book, review, crossing, topic, reply }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { errors } = useSelector((state) => state.ui);
    const [reason, setReason] = useState(null);

    const handleChange = (value) => {
        setReason(value);
    };

    const handleClose = () => {
        dispatch({ type: Actions.UI.STOP_REPORT });
    };

    const onSubmit = (formData) => {
        let reportData = {
            type: type,
            username: username,
            userImage: userImage
        };
        if (reason) reportData.reason = reason;
        else if (!(!!reason && !!formData.reason)) reportData.reason = '';
        else if (!!reason=== false && !!formData.reason) reportData.reason = formData.reason;

        console.log(reportData);

        switch(type) {
            case 'book':
                if (book) reportData.book = book;
                break
            case 'review':
                if (review) reportData.review = review;
                break
            case 'crossing':
                if (crossing) reportData.crossing = crossing;
                break
            case 'topic':
                if (topic) reportData.topic = topic;
                break
            case 'reply':
                if (reply) {
                    reportData.reply = reply;
                }
                break
        }

        dispatch(addReport(reportData, username));
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{width: '98%', position: 'relative', marginLeft: 7, textAlign: "center"}}
            >
                 <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h4" className={classes.header}>
                        Make a report if you noticed something inappropriate
                    </Typography>
                </GridItem> 
                <GridItem xs={12} sm={12} md={12} style={{marginTop: 30, position: 'relative'}}>
                <RadioGroup value={reason} onChange={(event) => handleChange(event.target.value)}>
                {
                    items.map((item, index) =>{
                        return (
                            <FormControlLabel key={index} value={item} control={<Radio />} label={item}/>
                        );
                    })
                }
                    <FormControlLabel value="other-reason" control={<Radio />} label="Other reason" />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="reason"
                        type="text" 
                        multiline
                        rows={4}
                        disabled={reason !== "other-reason"}
                        label="Other reason" 
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                {
                    errors?.reason && <Danger>{errors?.reason}</Danger>
                }
                </RadioGroup>
                    <Button 
                        color="danger"
                        onClick={handleSubmit(onSubmit)}
                        className={classes.submitButton}
                    >
                        MAKE REPORT
                    </Button>
                </GridItem>
            </GridContainer>
        </Dialog>
    )
}

export default ReportForm;
