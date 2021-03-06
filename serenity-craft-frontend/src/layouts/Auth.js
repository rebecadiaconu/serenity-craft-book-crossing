import React, { useEffect, createRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import backgrImage from "assets/img/backgr2.jpg";
import routes from "routes.js";

// Components

// template
import AuthNavbar from "components-template/Navbars/AuthNavbar.js";
import Footer from "components-template/Footer/Footer.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
const useStyles = makeStyles(styles);

const Pages = (props) => {
  const { ...rest } = props;
  const wrapper = createRef();
  const classes = useStyles();

  useEffect(() => {
    document.body.style.overflow = "unset";
    return function cleanup() {};
  });

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBgImage = () => {
    return backgrImage;
  };

  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }

    return activeRoute;
  };

  return (
    <div>
      <AuthNavbar {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + getBgImage() + ")" }}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  );
}

export default Pages;