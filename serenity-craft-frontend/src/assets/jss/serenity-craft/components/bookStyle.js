import {
    cardTitle,
    tooltip,
    warningColor,
    roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const bookStyle = {
    tooltip,
    root: {
        width: '90%',
        margin: '0 auto',
        position: 'relative'
    },
    details: {
        textAlign: 'none'
    },
    left: {
        textAlign: 'left'
    },
    reviewContainer: {
        maxHeight: 600,
        minHeight: 150
    },
    userImage: {
        margin: 10
    },
    review: {
        width: '95%',
        padding: '10px 0',
        maxHeight: 150,
        margin: '0 auto',
        position: 'relative'
    },
    rating: {
        margin: '0 auto',
        textAlign: "center"
    },
    message: {
        margin: '0 auto',
        textAlign: "center",
        marginTop: "50px"
    },
    ratingIcon: {
        color: warningColor[0]
    },
    coverContainer: {
        display: 'flex',
        margin: '0 auto'
    },
    coverImage: {
        height: 600,
        width: 350,
        objectFit: "cover",
        margin: '0 auto',
        borderRadius: 30
    },
    special: {
        marginTop: 20,
        fontFamily: 'Sacramento, cursive'
    },
    testimonialIcon: {
        marginTop: "30px",
        "& svg": {
          width: "40px",
          height: "40px"
        }
    },
    cardTestimonialDescription: {
        fontFamily: "'Grandstander', cursive",
        color: "#999999"
    },
    actions: {
        position: 'absolute', 
        right: 10, 
        top: 10 
    }
};

export default bookStyle;