import React from "react";
import { Typography, Box } from "@material-ui/core";

const Error404 = () => {
  return (
    <Typography>
      <Box fontStyle="italic" fontSize="h4.fontSize" m={1}>
        Error 404
      </Box>
      <Box fontStyle="italic" fontSize="h5.fontSize" m={1}>
        The page cannot be found
      </Box>
      <Box fontStyle="italic" fontSize="h7.fontSize" m={1}>
        The page you are looking for might have been removed,
        <br />
        had its name changed, or is temporarily unavailable.
      </Box>
    </Typography>
  );
};
export default Error404;
