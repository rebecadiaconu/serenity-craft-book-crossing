import {
    tooltip,
    cardTitle,
    cardSubtitle,
} from "assets/jss/material-dashboard-pro-react.js";

const topicStyle = {
    tooltip,
    cardTitle,
    cardSubtitle,
    root: {
        minHeight: 800,
        maxHeight: 1100,
        margin: '0 auto'
    },
    user: {
        fontFamily: "'Grandstander', cursive"
    },
    card: {
        overflow: 'hidden',
        paddingTop: 60
    },
    replyCard: {
        margin: '10px 0',
        padding: '10px 0'
    },
    replyAvatar: {
        display: 'flex',
        margin: '5px auto',
        maxWidth: 40, 
        maxHeight: 40,
        '& img': {
            objectFit: 'cover',
            maxWidth: 40, 
            maxHeight: 40
        }
        // marginTop: 10
    },
    replyBtn: {
        position: 'absolute',
        right: 5
    },
    submitButton: {
        display: 'flex',
        margin: '0 auto'
    },
    addReply: {
        backgroundColor: "white",
        position: 'sticky',
        bottom: "1rem"
    }
};

export default topicStyle;