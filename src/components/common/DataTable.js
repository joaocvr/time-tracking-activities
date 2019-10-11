import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  paper: {
    width: "100%"
  }
}));

const DataTable = ({ columns, rows }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns && columns.map(c => <TableCell key={c}>{c}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map(r => (
              <TableRow key={r.c1}>
                {Object.values(r) &&
                  Object.values(r).map(tuple => (
                    <TableCell key={tuple} align="left">
                      {tuple}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={3} align={"right"}>
              Total
            </TableCell>
            <TableCell align={"center"}>134</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataTable;
