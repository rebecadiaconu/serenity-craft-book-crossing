import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { reportOnBookReviewTopicReply } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "redux/types";

// Components
import ReportForm from "util/components/ReportForm";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";

// @material-ui core
import { Tooltip, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// @material-ui/icons
import ReportIcon from '@material-ui/icons/Report';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const ReplyCard = ({ reply, classes, handleDelete }) => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const { authenticated, credentials } = useSelector(state => state.user);
    const { sendReport } = useSelector((state) => state.ui);

    return (
        <Card className={classes.replyCard}>
            {
                sendReport && authenticated && 
                <ReportForm 
                    open={sendReport} 
                    items={reportOnBookReviewTopicReply} 
                    type="reply"
                    reply={reply}
                    username={reply.username}
                    userImage={reply.userImage}
                />
            }
            <GridContainer
                alignItems="center"
                alignContent="center"
                justify="flex-start"
            >
                <GridItem xs={2} sm={2} md={2}>
                    <CardAvatar profile className={classes.replyAvatar}>
                        <img src={reply.userImage} />
                    </CardAvatar>
                </GridItem>
                <GridItem xs={9} sm={9} md={9}>
                    <Typography variant="body2" style={{display: "block"}}>{reply.body}</Typography>
                    <Typography variant="caption" style={{display: "block"}}>{dayjs(reply.createdAt).fromNow()}</Typography>
                </GridItem>
                {
                    (reply.username === credentials.username) ? (
                        <Tooltip title="Delete reply" classes={{tooltip: classes.tooltip }} >
                            <Button onClick={() => handleDelete(reply.replyId)} className={classes.replyBtn} justIcon round simple color="danger" fontSize="small"><DeleteForeverIcon /></Button>
                        </Tooltip>
                    ) : (
                        <Tooltip
                            id="tooltip-top"
                            title="REPORT"
                            placement="bottom"
                            classes={{tooltip: classes.tooltip }}
                        >
                            <Button size="sm" color="danger" round simple justIcon onClick={() => dispatch({ type: Actions.UI.REPORT }) } className={classes.replyBtn}>
                                <ReportIcon />
                            </Button>
                        </Tooltip>
                    )
                }
            </GridContainer>
        </Card>
    )
}

export default ReplyCard;