import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from "classnames";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { rejectReport, markSeen } from "redux/actions/adminActions";
import { Actions } from 'redux/types';

// components
import CardAvatar from "components/Card/CardAvatar.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import { makeStyles, Tooltip, Typography } from '@material-ui/core';

// icons
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EmailIcon from '@material-ui/icons/Email';

// Styles
import styles from "assets/jss/serenity-craft/components/reportCard";
const useStyles = makeStyles(styles);

const ReportCard = ({ report }) => {
    dayjs.extend(relativeTime);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [cardStyles, setStyles] = useState(undefined);
    const { admin, reports } = useSelector((state) => state.admin);

    useEffect(() => {
        if (admin && reports) {
            setStyles(classNames({
                [classes.unseen]: !report.seen,
                [classes.standBy]: report.status === "stand-by"
            }));
        }
    }, [reports, admin]);

    const handleSeeReport = () => {
        dispatch(markSeen(report));
    };

    const handleReject = () => {
        dispatch(rejectReport(report.reportId));
    };

    const handleAccept = () => {
        dispatch({ type: Actions.ADMIN.ACCEPT, payload: report });
    }

    return (
        <Card className={cardStyles}>
            <GridContainer
                alignItems="center"
                alignContent="center"
                justify="center"
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
                    {
                        report.type === 'crossing' && (
                            <Typography className={classes.cardDescrip} style={{marginTop: 6, marginBottom: 6}}>
                                REASON: {report.reason}
                            </Typography>
                        )
                    }
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        report.type !== 'crossing' && (
                            <Tooltip title="View report details" classes={{tooltip: classes.tooltip}} onClick={handleSeeReport}>
                                <Button simple color="primary" justIcon round><CalendarViewDayIcon /></Button>
                            </Tooltip>
                        )
                    }
                    {
                        (report.status === "unseen" || report.status === "stand-by") && (
                            <>
                            <Tooltip title="Accept report" classes={{tooltip: classes.tooltip}} onClick={handleAccept}>
                                <Button simple color="success" justIcon round><CheckCircleIcon /></Button>
                            </Tooltip>
                            <Tooltip title="Decline report" classes={{tooltip: classes.tooltip}} onClick={handleReject}>
                                <Button simple color="danger" justIcon round><CancelIcon /></Button>
                            </Tooltip>
                            <Tooltip title="Send email to know more" classes={{tooltip: classes.tooltip}}>
                                <Button simple color="warning" justIcon round><EmailIcon /></Button>
                            </Tooltip>
                            </>
                        )
                    }
                    </div>
                </GridItem>
                <GridItem xs={2} sm={2} md={3}>
                    <CardAvatar profile className={classes.cardAvatar}>
                        <img src={report.recipientImage} />
                    </CardAvatar>
                </GridItem>
            </GridContainer>
        </Card>
    )
}

export default ReportCard;
