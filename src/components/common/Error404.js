import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Error404 = () => {
  return (
    <Box fontStyle="italic">
      <Typography variant={"h4"}>Error 404</Typography>
      <Typography variant={"h5"}>The page cannot be found</Typography>
      <Typography>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
    </Box>
  );
};
export default Error404;
