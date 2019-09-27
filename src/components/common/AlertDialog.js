import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

const AlertDialog = ({
  title,
  description,
  disagree,
  agree,
  open,
  handleClose
}) => {
  const dialogTitle = title ? (
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
  ) : (
    <div />
  );

  const dialogContent = description ? (
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
  ) : (
    <div />
  );

  const agreeButton = agree ? (
    <Button onClick={handleClose} color="primary" autoFocus>
      {agree}
    </Button>
  ) : (
    <div />
  );

  const disagreeButton = disagree ? (
    <Button onClick={handleClose} color="primary">
      {disagree}
    </Button>
  ) : (
    <div />
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {dialogTitle}
      <Divider />
      {dialogContent}
      <DialogActions>
        {disagreeButton}
        {agreeButton}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
