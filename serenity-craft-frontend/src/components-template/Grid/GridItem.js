import React from "react";
import PropTypes from "prop-types";

// @material-ui core
import { makeStyles, Grid } from "@material-ui/core";

const styles = {
  grid: {
    padding: "0 15px !important"
  }
};
const useStyles = makeStyles(styles);

const GridItem = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default GridItem;