import React, { forwardRef } from 'react';

// Components

//template
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import UploadImage from 'util/components/UploadImage';

// @material-ui core
import { Dialog, makeStyles, Slide, Typography } from '@material-ui/core';

// Styles
import upload from "assets/jss/serenity-craft/components/user/editProfile";
import formStyles from "assets/jss/serenity-craft/util/formStyle";
import featherLogo from "assets/img/feather-logo.png";

const uploadStyles = makeStyles({
    ...upload,
    ...formStyles
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ChangeCoverImage = ({ justAdded, handleClose }) => {
    const classes = uploadStyles();
    return (
        <Dialog
            fullWidth={false}
            maxWidth="sm"
            open={justAdded}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{width: '95%', position: 'relative', marginLeft: 10, height: 800}}
            >
                <GridItem xs={2} sm={2} md={2}>
                    <img src={featherLogo} className={classes.logo} />
                </GridItem>
                <GridItem xs={10} sm={10} md={6}>
                    <Typography variant="h4" className={classes.header}>
                        Upload a cover image for you book to make it more atractive!
                    </Typography>
                </GridItem>   
                <GridItem xs={12} sm={12} md={6} style={{marginTop: 30, position: 'relative'}}>
                    <UploadImage 
                        changeButtonProps={{
                            color: "info",
                            round: true,
                            className: classes.submitButton
                        }}
                        removeButtonProps={{
                            color: "danger",
                            round: true,
                            className: classes.submitButton
                        }}  
                        bookCover
                    />
                </GridItem>        
            </GridContainer>
        </Dialog>
    );
}

export default ChangeCoverImage;
