import React, { useState, forwardRef, useEffect } from 'react';
import featherLogo from "assets/img/feather-logo.png";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { allGenres } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { addReview } from "redux/actions/reviewActions";
import { Actions } from 'redux/types';

// @material-ui core
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from '@material-ui/core';


// Components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";

// Styles
import styles from "assets/jss/serenity-craft/components/addForm"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AddReview = ({ open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { errors } = useSelector((state) => state.ui);
    const { bookId } = useParams();

    useEffect(() => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
    }, []);

    const onSubmit = (formData) => {
        let reviewData = {
            ...formData,            
            rating: parseInt(formData.rating),
        };
        dispatch(addReview(reviewData, bookId));
    };

    const handleClose = () => {
        dispatch({ type: Actions.REVIEW.STOP_REVIEW });
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
                style={{width: '95%', position: 'relative', marginLeft: 10,  height: 500, textAlign: "center"}}
            >
                <GridItem xs={2} sm={2} md={2}>
                    <img src={featherLogo} className={classes.logo} />
                </GridItem>
                <GridItem xs={10} sm={10} md={10}>
                    <Typography variant="h4" className={classes.header}>
                    Let other people know what you think!
                    </Typography>
                </GridItem>  
                <GridItem xs={12} sm={12} md={12} style={{marginTop: 30, position: 'relative'}}>
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="rating" 
                        type="number" 
                        label="Your rating" 
                        error={errors?.rating ? true : false}
                        helperText={errors?.rating}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="body" 
                        multiline
                        rows={4}
                        label="Your review" 
                        error={errors?.body ? true : false}
                        helperText={errors?.body}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                     <Button 
                        color="rose"
                        onClick={handleSubmit(onSubmit)}
                        className={classes.submitButton}
                    >
                        ADD REVIEW
                    </Button>
                </GridItem> 
            </GridContainer>
        </Dialog>
    )
}

export default AddReview;
