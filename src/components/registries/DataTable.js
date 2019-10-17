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

const DataTable = ({ columns, rows, total }) => {
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
            rows.map(row => {
              const key = Object.keys(row)[0];
              const arrayValues = Object.values(row)[0];
              return (
                <TableRow key={key}>
                  {arrayValues &&
                    arrayValues.length > 0 &&
                    arrayValues.map(value => (
                      <TableCell align="left" key={value}>
                        {value}
                      </TableCell>
                    ))}
                </TableRow>
              );
            })}
          <TableRow>
            <TableCell colSpan={4} align={"right"}>
              Total
            </TableCell>
            <TableCell align={"center"}>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataTable;
