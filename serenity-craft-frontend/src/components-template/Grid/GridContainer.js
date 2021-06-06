import React from "react";
import PropTypes from "prop-types";

// @material-ui core
import { Grid, makeStyles } from "@material-ui/core";

// Styles
const styles = {
  grid: {
    margin: "0 -15px",
    width: "calc(100% + 30px)"
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  }
};
const useStyles = makeStyles(styles);

const GridContainer = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default GridContainer;