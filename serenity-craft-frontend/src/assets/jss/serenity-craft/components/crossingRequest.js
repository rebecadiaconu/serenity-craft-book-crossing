import {
    roseColor,
    grayColor,
    tooltip
} from "assets/jss/material-dashboard-pro-react";

const crossingRequest = {
    tooltip,
    header: {
        margin: '15px 0',
        fontFamily: "'Sacramento', cursive",
        textAlign: "center",
    },
    unseen: {
        boxShadow: '1px 2px 10px 1px #ff1744'
    },
    modalGrid: {
        width: '99%', 
        position: 'relative',
        marginLeft: 7
    },
    userCardImage: {
        position: 'absolute', 
        left: 10, 
        maxWidth: 75, 
        maxHeight: 75, 
        objectFit: 'cover', 
        zIndex: 5,
        '& img': {
            objectFit: 'cover',
            maxWidth: 75, 
            maxHeight: 75
        }
    },
    specialSubtitle :{
        fontFamily: "'Grandstander', cursive",
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    requestCardAvatar: {
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
    cover: {
        borderRadius: 10,
        maxHeight: 400,
        maxWidth: 300,
        objectFit: 'cover',
        boxShadow: '1px 1px 10px 1px #999999'
    },
    footer: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: "'Grandstander', cursive",
    }
};

export default crossingRequest;