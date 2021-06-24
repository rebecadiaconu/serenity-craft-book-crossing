import {
    cardTitle,
    tooltip,
    warningColor,
    infoColor
} from "assets/jss/material-dashboard-pro-react.js";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.js";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
  
const bookContainer = {
    ...hoverCardStyle,
    ...dashboardStyle,
    tooltip,
    authorName: {
        ...cardTitle,
        textAlign: "center",
        color: infoColor[2]
    },
    backUp: {
        position: 'fixed',
        bottom: 30,
        right: 30
    },
    cardImage: {
        maxHeight: 400,
        objectFit: "cover"
    },
    coverContainer: {
        display: 'flex',
        margin: '0 auto',
        marginTop: 15,
        marginBottom: 15
    },
    coverImage: {
        height: 650,
        width: 400,
        objectFit: "cover",
        margin: '0 auto'
    },
    fav: {
        boxShadow: '1px 2px 10px 1px #ff1744'
    },
    grayOverlay: {
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor:' rgba(128,128,128,0.5)',
        '& h4': {
            transform: 'rotate(45deg)',
            fontSize: '3rem',
            fontFamily: "'Grandstander', cursive",
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
            color: 'white',
            verticalAlign: 'center'
        }
    },
    owner: {
        boxShadow: '1px 2px 10px 1px #29b6f6'
    },
    rating: {
        margin: '0 auto',
        textAlign: "center"
    },
    ratingIcon: {
        color: warningColor[0]
    },
    unavailable :{
        boxShadow: '1px 2px 10px 2px #78909c'
    },
};
  
export default bookContainer;
  