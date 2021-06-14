import {
  defaultFont,
  dangerColor,
  roseColor, 
  grayColor,
  whiteColor
} from "assets/jss/material-dashboard-pro-react.js";

import customDropdownStyle from "assets/jss/material-dashboard-pro-react/components/customDropdownStyle.js";

const adminNavbarLinksStyle = theme => ({
  ...customDropdownStyle(theme),
  reqSeen: {
    color: grayColor[0]
  },
  reqUnseen: {
    color: roseColor[0]
  },
  read: {
    color: grayColor[0],
    '&:hover': {
      backgroundColor: grayColor[0],
      color: whiteColor,
    }
  },
  noRead : {
    color: roseColor[0],
    '&:hover': {
      backgroundColor: roseColor[0],
      color: whiteColor,
    }
  },
  iconButton: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
      color: 'black'
    }
  },
  icon: {
    margin: '0 auto',
    paddingTop: 7,
    paddingRight: 5,
    paddingBottom: -5
  },
  search: {
    margin: "0",
    paddingTop: "7px",
    paddingBottom: "7px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "10px 15px",
      width: "auto"
    }
  },
  searchInput: {
    paddingTop: "2px"
  },
  searchRTL: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "18px !important"
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "12px"
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0!important",
    textTransform: "none"
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      position: "absolute",
      right: 65,
      margin: "5px 15px 0",
      width: "auto",
      height: "auto",
      "& svg": {
        width: "30px",
        height: "24px",
        marginRight: "19px",
        marginLeft: "3px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        width: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        marginRight: "19px",
        marginLeft: "3px"
      }
    }
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "38px",
      float: "right"
    }
  },
  top: {
    zIndex: "4"
  },
  searchIcon: {
    width: "17px",
    zIndex: "4"
  },
  links: {
    width: "20px",
    height: "20px",
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      // display: "block",
      width: "30px",
      height: "30px",
      color: "inherit",
      // opacity: "0.8",
      marginRight: "16px",
      marginLeft: "-5px"
    }
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "5px",
      border: "1px solid " + whiteColor,
      right: "5px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "14px",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px",
      color: roseColor[0]
    }
  },
  managerClasses: {
    [theme.breakpoints.up("md")]: {
      display: "inline-block"
    }
  },
  headerLinksSvg: {
    width: "20px !important",
    height: "20px !important"
  }
});

export default adminNavbarLinksStyle;
