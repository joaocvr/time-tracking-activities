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

import { hhMMToDate, minutesOfDifference } from "../../utils/DateUtils";

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

const DateTextField = ({ label, error, onChange }) => {
  const classes = useStyles();
  return (
    <TextField
      required
      error={error}
      type="date"
      id={label}
      label={label}
      InputLabelProps={{
        shrink: true
      }}
      className={classes.paddingBottom2}
      onChange={onChange}
    />
  );
};

const TimeTextField = ({ label, error, onChange }) => {
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
      onChange={onChange}
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
    date: "",
    start: "",
    finish: "",
    total: 0,

    isActivityNameOk() {
      return this.activityName && this.activityName !== "" ? true : false;
    },
    isDateOk() {
      return this.date && this.date !== "" ? true : false;
    },
    isStartOk() {
      return this.start && this.start !== "" ? true : false;
    },
    isFinishOk() {
      return this.finish && this.finish !== "" ? true : false;
    },
    isAllFieldsOk() {
      return (
        this.isActivityNameOk() &&
        this.isDateOk() &&
        this.isStartOk() &&
        this.isFinishOk()
      );
    }
  };

  const activitiesNames =
    activities && Object.keys(activities) ? Object.keys(activities) : [];
  const [newRegistry, setNewRegistry] = React.useState(initialRegistry);

  const handleChange = (attribute, isErrorFunction) => event => {
    setNewRegistry({ ...newRegistry, [attribute]: event.target.value });
    isErrorFunction();
  };

  const [isActivityNameError, setIsActivityNameError] = React.useState(false);
  const [isDateError, setIsDateError] = React.useState(false);
  const [isStartError, setIsStartError] = React.useState(false);
  const [isFinishError, setIsFinishError] = React.useState(false);

  const handleClickAdd = () => {
    const startDate = hhMMToDate(newRegistry.start, newRegistry.date);
    const finishDate = hhMMToDate(newRegistry.finish, newRegistry.date);
    const finishLaterThanStart = finishDate > startDate;

    if (newRegistry.isAllFieldsOk() && finishLaterThanStart) {
      const newRegistryWithTimes = {
        ...newRegistry,
        start: startDate.toLocaleTimeString(),
        finish: finishDate.toLocaleTimeString(),
        activityId: activities[newRegistry.activityName].id,
        total: minutesOfDifference(startDate, finishDate)
      };

      addRegistry({ ...newRegistryWithTimes });
      handleClose();
      setNewRegistry(initialRegistry);
    } else if (!finishLaterThanStart) {
      setNewRegistry({ ...newRegistry, finish: "" });
    }

    newRegistry.isActivityNameOk()
      ? setIsActivityNameError(false)
      : setIsActivityNameError(true);
    newRegistry.isDateOk() ? setIsDateError(false) : setIsDateError(true);
    newRegistry.isStartOk() ? setIsStartError(false) : setIsStartError(true);
    newRegistry.isFinishOk() ? setIsFinishError(false) : setIsFinishError(true);
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
              value={newRegistry.activityName ? newRegistry.activityName : " "}
              error={isActivityNameError}
              disabled={false}
              onChange={handleChange("activityName", () =>
                setIsActivityNameError(false)
              )}
              items={activitiesNames}
            />
            <DateTextField
              error={isDateError}
              label={"Date"}
              onChange={handleChange("date", () => setIsDateError(false))}
            />
            <TimeTextField
              error={isStartError}
              label={"Start"}
              onChange={handleChange("start", () => setIsStartError(false))}
            />
            <TimeTextField
              error={isFinishError}
              label={"Finish"}
              onChange={handleChange("finish", () => setIsFinishError(false))}
            />
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
    activities && activities[categoryName] ? activities[categoryName] : [],
  open,
  handleClose
});

export default connect(
  mapStateToProps,
  { addRegistry }
)(AddRegistryDialog);
