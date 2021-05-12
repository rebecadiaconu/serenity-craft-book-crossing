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
        objectFit: "fill"
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
    }
};
  
export default bookStyle;
  