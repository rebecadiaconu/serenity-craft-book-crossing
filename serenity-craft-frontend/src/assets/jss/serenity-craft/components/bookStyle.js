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
    rating: {
        margin: '0 auto',
        textAlign: "center"
    },
    ratingIcon: {
        color: warningColor[0]
    },
    coverContainer: {
        display: 'flex',
        margin: '0 auto',
        marginTop: 15,
        marginBottom: 15
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