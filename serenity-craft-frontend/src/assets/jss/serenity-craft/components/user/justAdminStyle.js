import {
    whiteColor,
    blackColor,
    hexToRgb,
    roseColor,
    tooltip
} from "assets/jss/material-dashboard-pro-react.js";


const justAdminStyle = {
    tooltip,
    fullPage: {
        padding: "40px 0",
        position: "relative",
        minHeight: "100vh",
        margin: "0",
        border: "0",
        color: whiteColor,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100%",
        "& footer": {
          position: "absolute",
          bottom: "0",
          width: "100%",
          border: "none !important"
        },
        "&:before": {
          backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.65)"
        }
    },
    header: {
        margin: '15px 0',
        fontFamily: "'Sacramento', cursive",
        textAlign: "center"
    },
    logOutBtn: {
        position: 'fixed',
        top: 20,
        right: 20
    },
    specialSubtitle :{
        fontFamily: "'Grandstander', cursive",
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
};

export default justAdminStyle;