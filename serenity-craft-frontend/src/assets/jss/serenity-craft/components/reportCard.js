import {
    tooltip,
    roseColor,
    primaryColor
} from "assets/jss/material-dashboard-pro-react";

const reportCard = {
    tooltip,
    sender: {
        color: primaryColor[0]
    },
    recipient: {
        color: roseColor[0]
    },
    modalGrid: {
        width: '99%', 
        position: 'relative',
        marginLeft: 7
    },
    cardAvatar: {
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 60, 
        maxHeight: 60, 
        objectFit: 'cover',
        '& img': {
            objectFit: 'cover',
            maxWidth: 60, 
            maxHeight: 60
        }
    },
    unseen: {
        boxShadow: '2px 2px 20px 1px #de3163'
    },
    standBy: {
        boxShadow: '1px 2px 10px 1px #efcc00'
    },
    cardDescrip: {
        fontFamily: "'Grandstander', cursive",
        margin: '0 auto',
        marginTop: 6
    }
};

export default reportCard;