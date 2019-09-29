import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";

import { addActivity } from "./actions";
import { bindActivityToCategory } from "../categories/actions";

const uuidv4 = require("uuid/v4");

const NameTextField = ({ isError, value, onChange }) => {
  return !isError ? (
    <TextField label="Name" value={value} onChange={onChange} />
  ) : (
    <TextField error required label="Name" value={value} onChange={onChange} />
  );
};

const SelectCategory = ({ isError, value, onChange, categories }) => {
  const categoriesValues = Object.values(categories);
  const MenuItems =
    categoriesValues.length > 0 ? (
      categoriesValues.map(c => (
        <MenuItem key={c.id} value={c.name}>
          {c.name}
        </MenuItem>
      ))
    ) : (
      <div />
    );

  return !isError ? (
    <Select value={value} onChange={onChange}>
      {MenuItems}
    </Select>
  ) : (
    <Select error required value={value} onChange={onChange}>
      {MenuItems}
    </Select>
  );
};

const AddActivityDialog = ({
  open,
  handleClose,
  addActivity,
  bindActivityToCategory,
  categories
}) => {
  const [nameFullfilled, setNameFullfilled] = React.useState(true);
  const [categoryFullfilled, setCategoryFullfilled] = React.useState(true);
  const initialActivity = {
    id: uuidv4(),
    name: "",
    category: ""
  };
  const [newActivity, setNewActivity] = React.useState(initialActivity);

  const handleChange = name => event => {
    setNewActivity({ ...newActivity, [name]: event.target.value });
  };

  const handleClickAdd = () => {
    const isNameFullfilled = newActivity.name && newActivity.name !== "";
    const isCategoryFullfilled =
      newActivity.category && newActivity.category !== "";

    if (isNameFullfilled && isCategoryFullfilled) {
      addActivity({
        id: newActivity.id,
        name: newActivity.name,
        category: newActivity.category
      });
      bindActivityToCategory({
        nameActivity: newActivity.name,
        nameCategory: newActivity.category
      });
      handleClose();
      setNewActivity(initialActivity);
      setNameFullfilled(true);
      setCategoryFullfilled(true);
    } else {
      isNameFullfilled ? setNameFullfilled(true) : setNameFullfilled(false);
      isCategoryFullfilled
        ? setCategoryFullfilled(true)
        : setCategoryFullfilled(false);
    }
  };

  const closeAndClearControllers = () => {
    setNameFullfilled(true);
    setNewActivity(initialActivity);
    setCategoryFullfilled(true);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={closeAndClearControllers}>
      <form autoComplete="off">
        <DialogTitle>New activity</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl>
            <NameTextField
              isError={!nameFullfilled}
              value={newActivity.name}
              onChange={handleChange("name")}
            />
          </FormControl>
        </DialogContent>
        <DialogContent>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <SelectCategory
              isError={!categoryFullfilled}
              value={newActivity.category}
              onChange={handleChange("category")}
              categories={categories}
            />
          </FormControl>
        </DialogContent>
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

const mapStateToProps = ({ categories }, { open, handleClose }) => ({
  categories: categories,
  open,
  handleClose
});

export default connect(
  mapStateToProps,
  { addActivity, bindActivityToCategory }
)(AddActivityDialog);
