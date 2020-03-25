import React from "react";
import { TableRow, TableCell, Checkbox } from "@material-ui/core";

import { humanDate } from "../../../../util";

export const ImageTableRow = (props) => {
  const { image, onTableRowClick, isInSelection, hasJobs, hasRunningJob, isItemSelected, labelId, onSelect } = props;

  const renderStatus = () => {
    if (hasJobs) {
      if (hasRunningJob) {
        return <p>processing</p>
      } else {
        return <p>has results</p>
      }
    } else {
      return <p>none of results are available</p>
    }
  }

  return (
      <TableRow
        hover
        onClick={e => onTableRowClick(image.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={image.id}
        selected={isItemSelected}
      >
      
        {isInSelection &&
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ "aria-label": labelId }}
              onClick={event => onSelect(image.id)}
            />
          </TableCell>
        }

        <TableCell>
          <img src={image.thumb} style={{width: 53, height: 53}} alt=''/>
        </TableCell>

        <TableCell>{image.originalFilename}</TableCell>

        <TableCell>{humanDate(image.created)}</TableCell> 

        <TableCell>
          {renderStatus()}
        </TableCell>
      </TableRow>
      
  )
}