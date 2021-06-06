import React from "react";
import PropTypes from "prop-types";

// @material-ui core 
import { LinearProgress, makeStyles } from "@material-ui/core";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/customLinearProgressStyle.js";
const useStyles = makeStyles(styles);

const CustomLinearProgress = (props) => {
  const classes = useStyles();
  const { color, ...rest } = props;
  return (
    <LinearProgress
      {...rest}
      classes={{
        root: classes.root + " " + classes[color + "Background"],
        bar: classes.bar + " " + classes[color]
      }}
    />
  );
}

CustomLinearProgress.defaultProps = {
  color: "gray"
};

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};

export default CustomLinearProgress;