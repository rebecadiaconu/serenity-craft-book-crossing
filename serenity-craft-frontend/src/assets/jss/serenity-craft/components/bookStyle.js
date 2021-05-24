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
    reviewRightButton: {
        position: 'absolute',
        left: 10,
        visibility: 'hidden',
        transition: "all 100ms ease 0s"
    },
    reviewLeftButton: {
        position: 'absolute',
        right: 10,
        visibility: 'hidden',
        transition: "all 100ms ease 0s"
    },
    reviewWrapper: {
        position: 'relative',
        "&:hover": {
            "& $reviewRightButton": {
                transition: "all 100ms ease 0s",
                left: -30,
                visibility: 'visible'
            },
            "& $reviewLeftButton": {
                transition: "all 100ms ease 0s",
                right: -30,
                visibility: 'visible'
            }
        }
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
        borderRadius: 15
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