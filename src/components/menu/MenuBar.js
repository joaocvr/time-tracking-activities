import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    border: 0,
    borderRadius: 3
  },
  login: {
    align: "right",
    color: "white",
    marginLeft: "auto"
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Button color="inherit" className={classes.login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
