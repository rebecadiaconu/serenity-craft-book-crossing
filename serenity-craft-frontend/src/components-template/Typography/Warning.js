import React from "react";
import PropTypes from "prop-types";

// @material-ui core
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/typographyStyle.js";
const useStyles = makeStyles(styles);

const Warning = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.warningText}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  children: PropTypes.node
};

export default Warning;