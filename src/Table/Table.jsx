import * as React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const Table = ({ columns,data,isLabel = true,sticky}) => {
    const classes = useStyles();
    return(
        <TableContainer>
            <MuiTable sx={{minWidth: 650}}>
        {data.length ? (
          <TableBody className={classes.tbody}>
            {data?.map((row, index) => (
              <TableRow key={index}>
               {columns?.map((col, ind) => (
                  <TableCell key={ind} className={classes.tcell}>
                    {col.renderer ? col.renderer(row, index) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Typography textAlign="center">No Data Found</Typography>
            </TableCell>
          </TableRow>
        )}
            </MuiTable>
        </TableContainer>
    )
}

const useStyles = makeStyles((theme) => ({
    thead: {
      background:"green",
      "& th": {
        // 
        fontWeight: "bold",
      },
    },
    tbody: {
      // border: "1px solid #e0e0e0",
      
    },
    tcell: {
      // borderRight: "1px solid #e0e0e0",
    },
  }));

export default Table;

