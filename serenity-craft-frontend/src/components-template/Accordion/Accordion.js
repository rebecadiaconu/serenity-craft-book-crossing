import React, { useState } from "react";
import PropTypes from "prop-types";

// Components

// @material-ui core
import { 
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles
 } from "@material-ui/core";

// icons
import ExpandMore from "@material-ui/icons/ExpandMore";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/accordionStyle.js";
const useStyles = makeStyles(styles);

const Accordion = (props) => {
  const [active, setActive] = useState(props.active);
  const handleChange = panel => (event, expanded) => {
    setActive(expanded ? panel : -1);
  };
  const classes = useStyles();
  const { collapses } = props;
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        return (
          <ExpansionPanel
            expanded={active === key}
            onChange={handleChange(key)}
            key={key}
            classes={{
              root: classes.expansionPanel,
              expanded: classes.expansionPanelExpanded
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              classes={{
                root: classes.expansionPanelSummary,
                expanded: classes.expansionPanelSummaryExpaned,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon
              }}
            >
              <h4 className={classes.title}>{prop.title}</h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {prop.content}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

Accordion.defaultProps = {
  active: -1
};

Accordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.number,
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired
};

export default Accordion;