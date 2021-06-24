import {
    cardTitle,
    grayColor
  } from "assets/jss/material-dashboard-pro-react.js";
  
  const userCardStyle = {
    cardTitle,
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
        "& small": {
            fontSize: "80%",
            fontWeight: "400"
        }
    },
    cardCategory: {
        marginTop: "10px",
        color: grayColor[0] + " !important",
        textAlign: "center",
        margin: "0 auto"
    },
    description: {
        color: grayColor[0]
    },
    email: {
        color: "inherit",
        "& h4": {
            marginBottom: "0px",
            marginTop: "0px"
        }
    },
    location: {
        color: "#999999",
        fontSize: "12px",
        lineHeight: "22px",
        display: "inline-flex",
        "& svg": {
            position: "relative",
            top: "4px",
            width: "16px",
            height: "16px",
            marginRight: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            position: "relative",
            top: "4px",
            fontSize: "16px",
            marginRight: "3px"
        }
    },
    updateProfileButton: {
        float: "right"
    },
    user: {
        fontFamily: "'Grandstander', cursive"
    }
  };
  export default userCardStyle;
  