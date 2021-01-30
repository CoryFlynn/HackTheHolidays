import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export interface Shoe {
  name: string;
  size: number;
  price: number;
}
export default function BasicTable({ rows }: { rows: Shoe[] }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Shoe</TableCell>
            <TableCell align="right">Size (US)</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.size / 2}</TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  style={
                    index % 4 == 0
                      ? { background: "#072eef", color: "white", borderColor: "white" }
                      : index % 4 == 1
                      ? { background: "#e60103", color: "white", borderColor: "white" }
                      : index % 4 == 2
                      ? { background: "#00c840", color: "white", borderColor: "white" }
                      : { background: "#eaec04", color: "white", borderColor: "white" }
                  }
                >
                  {" "}
                  BUY{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
