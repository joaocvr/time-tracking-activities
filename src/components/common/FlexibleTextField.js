import React from "react";
import TextField from "@material-ui/core/TextField";

const FlexibleTextField = ({ name, isError, value, onChange }) => {
  return !isError ? (
    <TextField label={name} value={value} onChange={onChange} />
  ) : (
    <TextField error required label={name} value={value} onChange={onChange} />
  );
};

export default FlexibleTextField;
