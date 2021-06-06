import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core 
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/cardIconStyle.js";
const useStyles = makeStyles(styles);

const CardIcon = (props) => {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  children: PropTypes.node
};

export default CardIcon;