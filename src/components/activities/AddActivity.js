import React from "react";

import CloseSharp from "@material-ui/icons/CloseSharp";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

import { addActivity } from "./actions";
import AlertDialog from "../common/AlertDialog";

const styles = makeStyles(theme => ({
  box: {
    width: "40%"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "40%"
  },
  gridContainerHeader: {
    margin: theme.spacing(1)
  },
  addButton: {
    variant: "contained",
    margin: theme.spacing(1),
    backgroundColor: "#29a329",
    color: "white",
    border: 1
  }
}));

const AddActivity = addActivity => {
  const classes = styles();

  const [isAddFormVisible, setAddFormVisible] = React.useState(false);
  const uuidv4 = require("uuid/v4");
  const initialActivity = {
    id: uuidv4(),
    name: "",
    type: ""
  };
  const [values, setValues] = React.useState(initialActivity);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const handleClick = () => {
    setOpenDialog(false);
    if (values && values.name && values.type) {
      addActivity.addActivity({ ...values });
      setValues(initialActivity);
      setAddFormVisible(false);
    } else {
      setOpenDialog(true);
    }
  };

  return !isAddFormVisible ? (
    <div>
      <Button
        size="small"
        onClick={() => setAddFormVisible(true)}
        className={classes.addButton}
      >
        Add a Activity
      </Button>
      <IconButton
        size="small"
        onClick={() => setAddFormVisible(true)}
        className={classes.addButton}
      >
        <AddIcon />
      </IconButton>
    </div>
  ) : (
    <div>
      <Grid container>
        <Box className={classes.box} border={1}>
          <Grid
            container
            direction="row"
            className={classes.gridContainerHeader}
          >
            <Grid item xs={9}>
              <Typography>
                <b>New Activity</b>
              </Typography>
            </Grid>
            <Grid item xs={3} align={"center"}>
              <IconButton onClick={() => setAddFormVisible(false)} size="small">
                <CloseSharp />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <form className={classes.form} autoComplete="off">
            <FormControl className={classes.formControl}>
              <TextField
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={values.type} onChange={handleChange("type")}>
                <MenuItem value={"Study"}>Study</MenuItem>
                <MenuItem value={"Workout"}>Workout</MenuItem>
                <MenuItem value={"Rest"}>Rest</MenuItem>
              </Select>
            </FormControl>
            <Grid container>
              <Grid item xs={12} align="center">
                <Button onClick={handleClick} className={classes.addButton}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <AlertDialog
        title={"Atention!"}
        description={"Fullfill all the fields"}
        agree={"OK"}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default connect(
  null,
  { addActivity }
)(withStyles(styles)(AddActivity));
