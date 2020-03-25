import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import { TableSortLabel } from "@material-ui/core";

import { useStyles } from "./styles"

const headCells = [
  { id: "thumb", numeric: false, disablePadding: false, label: "Preview", sortable: false },
  { id: "originalFilename", numeric: false, disablePadding: false, label: "Filename", sortable: true },
  { id: "created", numeric: false, disablePadding: false, label: "Created", sortable: true },
  { id: "status", numeric: false, disablePadding: false, label: "Status", sortable: false }
]

export const ImageTableHeader = (props) => {
  const classes = useStyles();
  const { isInSelection, onSelectAllClick, numSelected, rowCount, order, orderBy, onRequestSort } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {isInSelection &&
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all processes" }}
            />
          </TableCell>
        }

        {headCells.map(cell => (
          <TableCell
            key={cell.id}
            align={cell.numeric ? "right" : "left"}
            padding={cell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === cell.id ? order : false}
          >
            {cell.sortable ?
              <TableSortLabel
                active={orderBy === cell.id}
                direction={order}
                onClick={createSortHandler(cell.id)}
              >
                {cell.label}
                {orderBy === cell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel> : cell.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}