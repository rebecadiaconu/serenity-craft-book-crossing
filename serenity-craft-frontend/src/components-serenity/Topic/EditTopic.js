import React, { forwardRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from "react-redux"; 
import { editTopic } from "redux/actions/crossingActions";
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
import styles from "assets/jss/serenity-craft/util/formStyle"
const useStyles = makeStyles(styles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditTopic = ({ open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { errors, loadingButton } = useSelector((state) => state.ui);
    const { topicId, topic } = useSelector((state) => state.crossing); 
    const { crossingId } = useParams();
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        setDialog(true);

        return () => {
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        }
    }, []);

    useEffect(() => {
        if (dialog && topic &&  topicId) {
            if (!!topic?.body) setValue('body', topic.body);
            if (!!topic?.title) setValue('title', topic.title);
        }
    }, [dialog]);

    const onSubmit = (formData) => {
        dispatch(editTopic(formData, crossingId, topicId));
    };

    const handleClose = () => {
        dispatch({ type: Actions.CROSSING.STOP_EDIT_TOPIC });
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
                <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h4" className={classes.header}>
                    Edit you topic's content!
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
                        UPDATE TOPIC
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

export default EditTopic;
