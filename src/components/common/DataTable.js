import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

const DataTable = ({ columns, rows }) => {
  const classes = useStyles();

  console.log("DataTable", "columns", columns);
  console.log("DataTable", "rows", rows);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <Typography variant="h6">Workout</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map(row => (
                <TableRow key={row.a}>
                  <TableCell component="th" scope="row">
                    {row.a}
                  </TableCell>
                  <TableCell align="left">{row.b}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default DataTable;
