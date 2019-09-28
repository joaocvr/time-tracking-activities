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

import { connect } from "react-redux";

import { addCategory } from "./actions";

const AddCategoryDialog = ({ open, handleClose, addCategory }) => {
  const [name, setName] = React.useState("");
  const [nameFullfilled, setNameFullfilled] = React.useState(true);

  const handleClickAdd = () => {
    if (name && name !== "") {
      const uuidv4 = require("uuid/v4");
      addCategory({ id: uuidv4(), name, activities: [] });
      handleClose();
      setName("");
      setNameFullfilled(true);
    } else {
      setNameFullfilled(false);
    }
  };

  const handleClickClose = () => {
    handleClose();
    setName("");
  };

  return (
    <Dialog open={open} onClose={handleClickClose}>
      <form autoComplete="off">
        <DialogTitle>New category</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl>
            {nameFullfilled ? (
              <TextField
                label="Name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            ) : (
              <TextField
                error
                helperText={"Insert the name!"}
                required
                label="Name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={6} align="center">
              <Button onClick={handleClickClose}>Cancel</Button>
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

export default connect(
  null,
  { addCategory }
)(AddCategoryDialog);
