import React from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";

import MenuIcon from "@material-ui/icons/Menu";
import PieChart from "@material-ui/icons/PieChart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import QueryBuilder from "@material-ui/icons/QueryBuilder";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";

import { withRouter, Link } from "react-router-dom";

import Home from "../home/Home";
import TabPanel from "./TabPanel";
import Configurations from "../configurations/Configurations";
import Registries from "../registries/Registries";

const drawerWidth = 205;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const selectNavIcon = text => {
  switch (text) {
    case "Home":
      return <HomeIcon />;
    case "Configurations":
      return <ListIcon />;
    case "Registries":
      return <QueryBuilder />;
    case "Dashboard":
      return <PieChart />;
    case "Account":
      return <AccountCircle />;
    case "Logout":
      return <ExitToApp />;
    default:
      break;
  }
};

const selectItemValue = path => {
  switch (path ? path.toLowerCase() : "") {
    case "home":
      return 0;
    case "configurations":
      return 1;
    case "registries":
      return 2;
    case "dashboard":
      return 3;
    case "account":
      return 4;
    case "logout":
      return 5;
    default:
      return 0;
  }
};

const MiniDrawer = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const url = props.match.params ? props.match.params[0] : "";
  const itemValue = selectItemValue(url);
  const [value, setValue] = React.useState(itemValue);
  React.useEffect(() => {
    if (value !== itemValue) {
      setValue(itemValue);
    }
  }, [value, itemValue]);

  const handleChange = newValue => setValue(selectItemValue(newValue));
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Time Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Configurations", "Registries", "Dashboard"].map(text => (
            <ListItem
              button
              key={text}
              onClick={() => handleChange(text.toLowerCase())}
              component={Link}
              to={`${text.toLowerCase()}`}
            >
              <ListItemIcon>{selectNavIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Account", "Logout"].map(text => (
            <ListItem
              button
              key={text}
              onClick={() => handleChange(text.toLowerCase())}
              component={Link}
              to={`${text.toLowerCase()}`}
            >
              <ListItemIcon>
                <ListItemIcon>{selectNavIcon(text)}</ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TabPanel value={value} index={0}>
          Home
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Configurations
          <Configurations />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Registries
          <Registries />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Dashboard
        </TabPanel>
        <TabPanel value={value} index={4}>
          Account
        </TabPanel>
        <TabPanel value={value} index={5}>
          Logout
        </TabPanel>
      </main>
    </div>
  );
};

export default withRouter(MiniDrawer);
