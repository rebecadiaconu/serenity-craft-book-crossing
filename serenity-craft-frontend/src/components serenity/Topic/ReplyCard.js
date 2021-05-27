import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { useSelector } from "react-redux";

// Components
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";

// @material-ui core
import { Tooltip, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// @material-ui/icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const ReplyCard = ({ reply, classes, handleDelete }) => {
    dayjs.extend(relativeTime);
    const { credentials } = useSelector(state => state.user);

    return (
        <Card className={classes.replyCard}>
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
                    (reply.username === credentials.username) && (
                        <Tooltip title="Delete reply" classes={{tooltip: classes.tooltip }} >
                            <Button onClick={() => handleDelete(reply.replyId)} className={classes.replyBtn} justIcon round simple color="danger" fontSize="small"><DeleteForeverIcon /></Button>
                        </Tooltip>
                    )
                }
            </GridContainer>
        </Card>
    )
}

export default ReplyCard;