import {
  container,
  cardTitle,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  cardTitle: {
    paddingTop: 10,
    ...cardTitle,
    color: whiteColor
  },
  textField: {
    margin: '10px auto',
  },
  progress: {
    position: 'absolute'
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  forgotPassword: {
    marginTop: '10px',
    position: 'absolute',
    left: '20px'
  },
  signUp: {
    marginTop: '10px',
    position: 'absolute',
    right: '20px'
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  icon: {
    margin: '20px auto 0',
    width: 100
  },
  siteName: {
    margin: '-20 0 10',
    fontFamily: 'Sacramento, cursive'
  }
});

export default loginPageStyle;
