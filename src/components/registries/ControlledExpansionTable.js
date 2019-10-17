import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import DataTable from "./DataTable";
import AddRegistryDialog from "./AddRegistryDialog";

const useStyles = makeStyles(() => ({
  expansionPanel: {
    paddingTop: 10,
    width: "50%",
    backgroundColor: "#0d47a1",
    color: "white"
  },
  expansionPanelDetails: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  buttonAddRegistry: {
    width: "100%",
    textTransform: "none",
    backgroundColor: "#2196f3",
    color: "white",
    border: 1
  }
}));

const ControlledExpansionTable = ({ category, categoryId, registries }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openAddRegistry, setOpenAddRegistry] = React.useState(false);

  const toggleExpand = () => setExpanded(!expanded);
  const handleClickAddARegistry = () => setOpenAddRegistry(true);
  const total =
    registries && registries.length > 0
      ? registries.reduce((total, currentValue) => {
          return total + currentValue.total;
        }, 0)
      : 0;

  return (
    <ExpansionPanel
      className={classes.expansionPanel}
      expanded={expanded}
      onChange={() => toggleExpand()}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{category}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              className={classes.buttonAddRegistry}
              onClick={handleClickAddARegistry}
            >
              <Typography>
                Register an {category.toLowerCase()} activity
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              columns={[
                "Activity",
                "Date",
                "Start",
                "Finish",
                "Total (minutes)"
              ]}
              rows={registries.map(r => ({
                [r.id]: [r.activityName, r.date, r.start, r.finish, r.total]
              }))}
              total={total}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <AddRegistryDialog
        open={openAddRegistry}
        handleClose={() => setOpenAddRegistry(false)}
        categoryName={category}
        categoryId={categoryId}
      />
    </ExpansionPanel>
  );
};

export default ControlledExpansionTable;
