import React from "react";
import PropTypes from "prop-types";

// @material-uic ore
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/typographyStyle.js";
const useStyles = makeStyles(styles);

const Success = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.successText}>
      {children}
    </div>
  );
}

Success.propTypes = {
  children: PropTypes.node
};

export default Success;
