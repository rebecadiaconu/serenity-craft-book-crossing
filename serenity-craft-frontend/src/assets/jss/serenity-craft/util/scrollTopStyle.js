import {
    roseCardHeader
} from "assets/jss/material-dashboard-pro-react.js";

const scrollTopStyle = {
    toTop: {
        zIndex: 20,
        position: "fixed",
        bottom: "10vh",
        backgroundColor: "#DCDCDC",
        color: "#BF4A61",
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: "#BF4A61",
            backgroundColor: "#DCDCDC"
        },
        right: "5%"
    }
};
  
export default scrollTopStyle;
  