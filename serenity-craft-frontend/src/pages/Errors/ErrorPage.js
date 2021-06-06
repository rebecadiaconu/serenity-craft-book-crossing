import React from "react";

// Components

// template
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/errorPageStyles.js";
const useStyles = makeStyles(styles);

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.contentCenter}>
      <GridContainer>
        <GridItem md={12}>
          <h1 className={classes.title}>404</h1>
          <h2 className={classes.subTitle}>Page not found :(</h2>
          <h4 className={classes.description}>
            Ooooups! Looks like you got lost.
          </h4>
        </GridItem>
      </GridContainer>
    </div>
  );
}


export default ErrorPage;