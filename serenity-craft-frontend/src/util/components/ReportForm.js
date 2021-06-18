import React, { forwardRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { addReport} from "redux/actions/userActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import Danger from "components-template/Typography/Danger.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// @material-ui core
import { 
    CircularProgress,
    Dialog,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Slide,
    TextField, 
    Typography
 } from '@material-ui/core';

// Styles
import styles from "assets/jss/serenity-craft/components/addForm"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ReportForm = ({ open, items, type, username, userImage, book, review, bookId, crossing, crossingId, topic, reply, topicId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { errors, loadingButton } = useSelector((state) => state.ui);
    const [reason, setReason] = useState(null);;

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
        if (reason && reason !== "other-reason") reportData.reason = reason;
        else if (!(!!reason && !!formData.reason)) reportData.reason = '';
        else if (reason === "other-reason" && !!formData.reason) reportData.reason = formData.reason;

        switch(type) {
            case 'book':
                if (book) reportData.book = book;
                break
            case 'review':
                if (review && bookId) {
                    reportData.review = review;
                    reportData.bookId = bookId;
                }
                break
            case 'crossing':
                if (crossing) reportData.crossing = crossing;
                break
            case 'topic':
                if (topic && crossingId) {
                    reportData.topic = topic;
                    reportData.crossingId = crossingId;
                }
                break
            case 'reply':
                if (reply && topicId && crossingId) {
                    reportData.reply = reply;
                    reportData.topicId = topicId;
                    reportData.crossingId = crossingId;
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
                        disabled={loadingButton}
                        onClick={handleSubmit(onSubmit)}
                        className={classes.submitButton}
                    >
                        MAKE REPORT
                        {
                            loadingButton && (
                                <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={32} color='secondary' />
                            )
                        }
                    </Button>
                </GridItem>
            </GridContainer>
        </Dialog>
    )
}

export default ReportForm;
