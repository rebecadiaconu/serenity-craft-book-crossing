import {
    cardTitle,
    tooltip,
    warningColor,
    infoColor
} from "assets/jss/material-dashboard-pro-react.js";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.js";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
  
const bookStyle = {
    ...hoverCardStyle,
    ...dashboardStyle,
    tooltip,
    authorName: {
        ...cardTitle,
        textAlign: "center",
        color: infoColor[2]
    },
    cardImage: {
        maxHeight: 400,
        objectFit: "cover"
    },
    backUp: {
        position: 'fixed',
        bottom: 30,
        right: 30
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
        height: 650,
        width: 400,
        objectFit: "cover",
        margin: '0 auto'
    }
};
  
export default bookStyle;
  