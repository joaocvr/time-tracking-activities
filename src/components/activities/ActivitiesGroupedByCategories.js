import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { connect } from "redux-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const ActivitiesGroupedByCategories = ({ categories }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {categories &&
        categories.map(c => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{c.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{/*DATA TABLE*/}</ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
};

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(ActivitiesGroupedByCategories);
