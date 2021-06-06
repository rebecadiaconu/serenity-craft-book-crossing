import React from "react";
import PropTypes from "prop-types";

// @material-ui core
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/typographyStyle.js";
const useStyles = makeStyles(styles);

const Quote = (props) => {
  const classes = useStyles();
  const { text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node
};

export default Quote;