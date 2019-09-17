import React from "react";

import { withRouter, Link } from "react-router-dom";

import { Paper, Tabs, Tab, makeStyles } from "@material-ui/core";
import { PieChart, AccountCircle, QueryBuilder } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";

import TabPanel from "./TabPanel";
import Activities from "../activities/Activities";
import Home from "../home/Home";

const NavigationMenu = props => {
  const classes = useStyles();
  const path = props.match.path;
  const [value, setValue] = React.useState(selectValueByPath(path));
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Paper>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab
            icon={<HomeIcon />}
            label="Home"
            component={Link}
            to="/home"
            {...a11yProps(value)}
          />
          <Tab
            icon={<QueryBuilder />}
            label="Activities"
            component={Link}
            to="/activities"
            {...a11yProps(value)}
          />
          <Tab
            icon={<PieChart />}
            label="Dashboard"
            component={Link}
            to="/dashboard"
            {...a11yProps(value)}
          />
          <Tab
            icon={<AccountCircle />}
            label="Account"
            component={Link}
            to="/account"
            {...a11yProps(value)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          Home
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Activities
          <Activities />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Dashboard
        </TabPanel>
        <TabPanel value={value} index={3}>
          Account
        </TabPanel>
      </div>
    </Paper>
  );
};

const selectValueByPath = path => {
  switch (path) {
    case "/":
      return 0;
    case "/home":
      return 0;
    case "/activities":
      return 1;
    case "/dashboard":
      return 2;
    case "/account":
      return 3;
    default:
      return 0;
  }
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    maxWidth: "full",
    maxHeight: "full"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

export default withRouter(NavigationMenu);
