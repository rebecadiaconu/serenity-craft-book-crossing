import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { Actions } from "redux/types";

// Components

// template
import GridContainer from "components-template/Grid/GridContainer.js";
import GridItem from "components-template/Grid/GridItem.js";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/errorPageStyles.js";
const useStyles = makeStyles(styles);

const UnauthorizedPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch({ type: Actions.UI.CLEAR_ACTION });
  }, []);

  return (
    <div className={classes.contentCenter}>
      <GridContainer>
        <GridItem md={12}>
          <h1 className={classes.title}>403</h1>
          <h2 className={classes.subTitle}>Unauthorized :(</h2>
          <h4 className={classes.description}>
            Ooooups! Looks like you got lost.
          </h4>
        </GridItem>
      </GridContainer>
    </div>
  );
}


export default UnauthorizedPage;