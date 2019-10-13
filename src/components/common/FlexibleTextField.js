import React from "react";
import TextField from "@material-ui/core/TextField";

const FlexibleTextField = ({ name, isError, value, onChange }) => (
  <TextField
    error={isError}
    required
    label={name}
    value={value}
    onChange={onChange}
  />
);

export default FlexibleTextField;
