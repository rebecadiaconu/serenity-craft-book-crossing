import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Components

// template
import Card from "components-template/Card/Card.js";
import CardBody from "components-template/Card/CardBody.js";
import CardHeader from "components-template/Card/CardHeader.js";

// material-ui core
import { 
  makeStyles,
  Tab,
  Tabs
 } from "@material-ui/core";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/customTabsStyle.js";
const useStyles = makeStyles(styles);

const CustomTabs = (props) => {
  const [value, setValue] = useState(props.value);
  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={props.changeValue ? props.changeValue : handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.defaultProps = {
  value: 0
};

CustomTabs.propTypes = {
  // the default opened tab - index starts at 0
  value: PropTypes.number,
  // function for changing the value
  // note, if you pass this function,
  // the default function that changes the tabs will no longer work,
  // so you need to create the changing functionality as well
  changeValue: PropTypes.func,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};

export default CustomTabs;