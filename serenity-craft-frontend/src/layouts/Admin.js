import React, { useState, useEffect, createRef } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../redux/types";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ScrollToTop from "../util/components/ScrollToTop";

import routes from "routes.js";
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

let ps;

const useStyles = makeStyles(styles);

const Dashboard = (props) => {
  const { ...rest } = props;

  // states and functions
  const dispatch = useDispatch();
  const { scrolling, backUp } = useSelector((state) => state.ui);
  const { authenticated, credentials } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const image = require("assets/img/backgr2.jpg");
  const color = "rose";
  const bgColor ="black";
  const logo =require("assets/img/icon-white.png");
  
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });

  // ref for main panel div
  const mainPanel = createRef();

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });

      document.body.style.overflow = "hidden";
    }

    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };

  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getActiveRoute = routes => {
    let activeRoute = "";

    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
            window.location.href.split("http://localhost:3000")[1] === routes[i].layout + routes[i].path
        ) {
          return routes[i].name;
        }
      }
    }

    return activeRoute;
  };
  
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
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

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const handleScroll = (event) => {
    if (event.target.scrollTop > 100) {
        if (!scrolling) dispatch({ type: Actions.UI.SCROLLING });
    } else {
        if (scrolling) dispatch({ type: Actions.UI.STOP_SCROLLING });
    }
};

  return (
    <div className={classes.wrapper} onScroll={handleScroll}>
      <ScrollToTop top={mainPanel}/>
      <Sidebar
        routes={routes}
        logoText={"Serenity Craft"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        authenticated={authenticated}
        user={authenticated ? credentials : null}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          authenticated={authenticated}
          user={authenticated ? credentials : null}
          {...rest}
        />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/books" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/books" />
            </Switch>
          </div>
        )}
        {getRoute() ? <Footer fluid /> : null}
      </div>
    </div>
  );
}


export default Dashboard;