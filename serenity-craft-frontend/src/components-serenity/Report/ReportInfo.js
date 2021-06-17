import React, { forwardRef, useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Redux
import { useDispatch } from "react-redux";
import { Actions } from "redux/types";

// Components

// template
import CardAvatar from 'components-template/Card/CardAvatar';
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import ReportOnBookInfo from "components-serenity/Report/ReportOnBookInfo";
import ReportOnReplyTopicReview from "components-serenity/Report/ReportOnReplyTopicReview";

// @material-ui core
import { Dialog, Divider, makeStyles, Slide, Typography } from '@material-ui/core';

// Styles
import styles from "assets/jss/serenity-craft/components/reportCard"
const useStyles = makeStyles(styles);
// let ps;

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ReportInfo = ({ report, open }) => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        switch(report.type) {
            case 'book':
               setInfo(<ReportOnBookInfo book={report.book} />);
                break
            case 'topic':
                setInfo(<ReportOnReplyTopicReview topic={report.topic} />);
                break
            case 'reply':
                setInfo(<ReportOnReplyTopicReview reply={report.reply} />);
                break
            case 'review':
                setInfo(<ReportOnReplyTopicReview review={report.review} />);
                break
            default:
                break
        }
    }, []);

    const handleClose = () => {
        dispatch({ type: Actions.ADMIN.STOP_SEE_REPORT });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={report.type === "book" ? "lg" : "md"}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            {/* <div ref={mainPanel}> */}
                <GridContainer
                    display="flex"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    className={classes.modalGrid}
                >
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <GridItem xs={2} sm={2} md={3}>
                                <CardAvatar profile className={classes.cardAvatar}>
                                    <img src={report.senderImage} />
                                </CardAvatar>
                            </GridItem>
                            <GridItem xs={8} sm={8} md={6} style={{textAlign: 'center'}}>
                                <Typography className={classes.cardDescrip}>
                                    <span className={classes.recipient}>{report.sender}</span> made a report on <span className={classes.recipient}>{report.recipient}</span>
                                </Typography>
                                <Typography variant="caption" className={classes.cardDescrip} style={{color: "#999999"}}>
                                    {dayjs(report.createdAt).fromNow()}
                                </Typography>
                            </GridItem>
                            <GridItem xs={2} sm={2} md={3}>
                                <CardAvatar profile className={classes.cardAvatar}>
                                    <img src={report.recipientImage} />
                                </CardAvatar>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8} style={{textAlign: 'center'}}>
                                <Typography className={classes.cardDescrip}>
                                    REASON: {report.reason}
                                </Typography>
                            </GridItem>   
                        </GridContainer>
                    </GridItem>
                    <Divider />
                    <GridItem xs={12} sm={12} md={12}>
                        {info}
                    </GridItem>
                </GridContainer>
            {/* </div> */}
        </Dialog>        
    )
}

export default ReportInfo;
