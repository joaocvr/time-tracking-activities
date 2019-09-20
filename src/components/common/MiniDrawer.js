import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import {
  PieChart,
  AccountCircle,
  QueryBuilder,
  ExitToApp,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";

import { withRouter, Link } from "react-router-dom";

import Home from "../home/Home";
import Activities from "../activities/Activities";
import TabPanel from "./TabPanel";

const drawerWidth = 180;

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
    case "Activities":
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
    case "activities":
      return 1;
    case "dashboard":
      return 2;
    case "account":
      return 3;
    case "logout":
      return 4;
    default:
      return 0;
  }
};

const MiniDrawer = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const url = props.match.params ? props.match.params[0] : "";
  const [value, setValue] = React.useState(selectItemValue(url));

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
          {["Home", "Activities", "Dashboard"].map(text => (
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
          Activities
          <Activities />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Dashboard
        </TabPanel>
        <TabPanel value={value} index={3}>
          Account
        </TabPanel>
        <TabPanel value={value} index={4}>
          Logout
        </TabPanel>
      </main>
    </div>
  );
};

export default withRouter(MiniDrawer);
