import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import SelectMUI from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import { connect } from "react-redux";

import { addRegistry } from "./actions";

const uuidv4 = require("uuid/v4");

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%"
  },
  paddingBottom2: {
    width: "100%",
    paddingBottom: theme.spacing(2)
  }
}));

const Select = ({ label, value, error, disabled, onChange, items }) => {
  const MenuItems =
    items && items.length > 0 ? (
      items.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))
    ) : (
      <div />
    );

  const classes = useStyles();

  return (
    <div className={classes.paddingBottom2}>
      <FormControl className={classes.formControl}>
        <InputLabel>{label} *</InputLabel>
        <SelectMUI
          error={error}
          disabled={disabled}
          value={value}
          onChange={onChange}
        >
          {MenuItems}
        </SelectMUI>
      </FormControl>
    </div>
  );
};

const TimeTextField = ({ label, error }) => {
  const classes = useStyles();
  return (
    <TextField
      required
      error={error}
      type="time"
      defaultValue={"00:00"}
      id={label}
      label={label}
      InputLabelProps={{
        shrink: true
      }}
      className={classes.paddingBottom2}
    />
  );
};

const AddRegistryDialog = ({
  categoryName,
  categoryId,
  activities,
  addRegistry,
  open,
  handleClose
}) => {
  const classes = useStyles();

  const initialRegistry = {
    id: uuidv4(),
    activityId: "",
    activityName: "",
    categoryId: categoryId,
    categoryName: categoryName,
    start: 0,
    finish: 0,
    total: 0
  };

  const [newRegistry, setNewRegistry] = React.useState(initialRegistry);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = attribute => event => {
    setNewRegistry({ ...newRegistry, [attribute]: event.target.value });
  };

  const handleClickAdd = () => {
    //if (isRequiredFieldsFullfilled()) {
    addRegistry({ ...newRegistry });
    handleClose();
    setNewRegistry(initialRegistry);
    //}
  };

  const closeAndClearControllers = () => {
    setNewRegistry(initialRegistry);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={closeAndClearControllers}>
        <form autoComplete="off">
          <DialogTitle>Register an activity</DialogTitle>
          <Divider />
          <DialogContent>
            <Select
              label={"Category"}
              value={categoryName}
              error={false}
              disabled={true}
              items={[categoryName]}
            />
            <Select
              label={"Activity"}
              value={" "}
              error={false}
              disabled={false}
              onChange={handleChange}
              items={activities}
            />
            insert data input here!!!
            <TimeTextField error={false} label={"Start"} />
            <TimeTextField error={false} label={"Finish"} />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid container>
              <Grid item xs={6} align="center">
                <Button onClick={closeAndClearControllers}>Cancel</Button>
              </Grid>
              <Grid item xs={6} align="center">
                <Button onClick={handleClickAdd}>ADD</Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (
  { activities },
  { categoryName, categoryId, open, handleClose }
) => ({
  categoryName,
  categoryId,
  activities:
    activities && Object.keys(activities) ? Object.keys(activities) : [],
  open,
  handleClose
});

export default connect(
  mapStateToProps,
  { addRegistry }
)(AddRegistryDialog);
