/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui core
import { List, ListItem, makeStyles } from "@material-ui/core";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle.js";
const useStyles = makeStyles(styles);

const Footer = (props) => {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <p>
          Rebeca-Mihaela Diaconu, UNIBUC 
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.creative-tim.com?ref=mdpr-footer"
            className={anchor}
            target="_blank"
          >
            Creative Tim{" "}
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool
};

export default Footer;