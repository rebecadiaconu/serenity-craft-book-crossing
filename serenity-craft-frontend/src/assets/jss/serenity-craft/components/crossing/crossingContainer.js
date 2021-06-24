import CrossingBackgr from "assets/img/crossing-card-backgr.png";
import {
    tooltip,
} from "assets/jss/material-dashboard-pro-react.js";


const crossingContainer = {
    tooltip,
    avatar: {
        display: 'flex',
        margin: '0 auto',
        '& img': {
            objectFit: 'cover',
            maxWidth: 150, 
            maxHeight: 150
        }
        // marginTop: 10
    },
    changeBookBtn: {
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 2
    },
    cover: {
        maxHeight: 300,
        '& img': {
            borderRadius: 15,
            height: 280,
            width: 170,
            objectFit: 'cover',
            margin: 10
        }
    },
    info: {
        fontFamily: "'Grandstander', cursive",
        margin: '0 auto'
    },  
    link: {
        color: "black",
        textDecoration: "none",
        '&:hover': {
            color: "black",
            textDecoration: "none",
        }
    },
    root: {
        // backgroundImage: `url(${CrossingBackgr})`,
        margin: 15,
        maxHeight: 350,
        fontFamily: "'Grandstander', cursive",
        maxWidth: 450
    },
    right: {
        float: "right!important",
        display: "block"
    },
    submitButton: {
        display: 'flex',
        margin: '0 auto'
    }
};

export default crossingContainer;