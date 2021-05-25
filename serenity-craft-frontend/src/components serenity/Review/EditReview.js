import React, { useState, forwardRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { editReview } from "redux/actions/reviewActions";
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

const EditReview = ({ open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { errors } = useSelector((state) => state.ui);
    const { reviewData, reviewId } = useSelector((state) => state.review);
    const { bookId } = useParams();
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        setDialog(true);

        return () => {
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        }
    }, []);

    useEffect(() => {
        if (dialog && reviewId && reviewData) {
            console.log(reviewData);
            if (!!reviewData?.body) setValue('body', reviewData.body);
            if (!!reviewData?.rating) setValue('rating', reviewData.rating);
        }
    }, [dialog]);

    const onSubmit = (formData) => {
        let reviewData = {
            ...formData,            
            rating: parseInt(formData.rating),
        };
        dispatch(editReview(reviewData, bookId, reviewId));
    };

    const handleClose = () => {
        dispatch({ type: Actions.REVIEW.STOP_EDIT_REVIEW });
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
                <GridItem xs={10} sm={10} md={12}>
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
                        UPDATE REVIEW
                    </Button>
                </GridItem> 
            </GridContainer>
        </Dialog>
    )
}

export default EditReview;
