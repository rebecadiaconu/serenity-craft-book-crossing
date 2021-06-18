import React, { forwardRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { addTopic } from "redux/actions/crossingActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// @material-ui core
import { 
    CircularProgress,
    Dialog,
    makeStyles,
    Slide,
    Typography
 } from '@material-ui/core';
 import TextField from "@material-ui/core/TextField";

// Styles
import styles from "assets/jss/serenity-craft/components/addForm"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AddTopic = ({ open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { errors, loadingButton } = useSelector((state) => state.ui);
    const { crossingId } = useParams();

    useEffect(() => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
    }, []);

    const onSubmit = (formData) => {
        dispatch(addTopic(formData, crossingId));
    };

    const handleClose = () => {
        dispatch({ type: Actions.CROSSING.STOP_ADD_TOPIC });
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
                style={{width: '98%', position: 'relative', marginLeft: 7,  height: 500, textAlign: "center"}}
            >
                <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h4" className={classes.header}>
                        Something new to tell your crossing mate? Post a new topic!
                    </Typography>
                </GridItem>  
                <GridItem xs={12} sm={12} md={12} style={{marginTop: 30, position: 'relative'}}>
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="title" 
                        type="text" 
                        label="Choose an interesting title!" 
                        error={errors?.title ? true : false}
                        helperText={errors?.title}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                    <TextField 
                        className={classes.textField} 
                        variant="outlined"
                        name="body"
                        type="text" 
                        multiline
                        rows={4}
                        label="Topic content" 
                        error={errors?.body ? true : false}
                        helperText={errors?.body}
                        inputRef={register()}
                        InputLabelProps={{ shrink: true }}  
                        fullWidth
                    />
                     <Button 
                        color="rose"
                        disabled={loadingButton}
                        onClick={handleSubmit(onSubmit)}
                        className={classes.submitButton}
                    >
                        POST TOPIC
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

export default AddTopic;
