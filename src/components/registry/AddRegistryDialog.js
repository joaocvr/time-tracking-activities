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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import { addRegistry } from "./actions";

const uuidv4 = require("uuid/v4");

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%"
  }
}));

const SelectActivities = ({ isError, value, onChange, activitiesNames }) => {
  const MenuItems =
    activitiesNames && activitiesNames.length > 0 ? (
      activitiesNames.map(c => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))
    ) : (
      <div />
    );

  return !isError ? (
    <Select onChange={onChange}>{MenuItems}</Select>
  ) : (
    <Select error required onChange={onChange}>
      {MenuItems}
    </Select>
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

  const isRequiredFieldsFullfilled = () => {
    return (
      newRegistry.activityId &&
      newRegistry.activityId !== "" &&
      newRegistry.activityName &&
      newRegistry.activityName !== ""
    );
  };

  const handleChange = attribute => event => {
    setNewRegistry({ ...newRegistry, [attribute]: event.target.value });
  };

  const handleClickAdd = () => {
    if (isRequiredFieldsFullfilled) {
      addRegistry({ ...newRegistry });
      handleClose();
      setNewRegistry(initialRegistry);
    }
  };

  const closeAndClearControllers = () => {
    setNewRegistry(initialRegistry);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={closeAndClearControllers}>
      <form autoComplete="off">
        <DialogTitle>Start an activity</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>{categoryName}</Typography>
        </DialogContent>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <SelectActivities
              isError={isRequiredFieldsFullfilled}
              onChange={handleChange}
              activitiesNames={activities}
            />
          </FormControl>
        </DialogContent>
        <br />
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
