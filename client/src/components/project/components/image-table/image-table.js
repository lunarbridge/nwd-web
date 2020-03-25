import React from "react";
import { Paper, TablePagination, TableBody, Table } from "@material-ui/core";

import { useStyles } from "./styles";
import { useImageTable, usePrediction, useImageData } from "../../hooks";
import { ImageTableHeader } from "../image-table-header";
import { ImageTableRow } from "../image-table-row";
import { ImageTableToolbar } from "../image-table-toolbar"; 
import { ImageTableRowDetail } from "../image-table-row-detail";

export const ImageTable = (props) => {
  const classes = useStyles();
  const { projectId, userIsAdmin, username } = props;

  const data = useImageData({ projectId: projectId });
  const table = useImageTable({ 
    projectId: projectId,
    imageData: data
   });
  const prediction = usePrediction({ projectId: projectId });
    
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ImageTableToolbar
          numSelected={table.selected.length}
          isInSelection={table.isInSelection}
          onInSelection={table.handleInSelection}
          onDeleteSelected={table.handleDeleteSelected}
          userIsAdmin={userIsAdmin}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="slides table"
          >
            <ImageTableHeader
              numSelected={table.selected.length}
              rowCount={data.images.length}
              order={table.order}
              orderBy={table.orderBy}
              onSelectAllClick={table.handleSelectAllClick}
              onRequestSort={table.handleRequestedSort}
              isInSelection={table.isInSelection}
              // onInSelection={table.handleInSelection}
            />
            <TableBody>
              {table.imagesPerPage().map((image, index) => {
                const imageId = image.id;
                const jobs = data.getJobs(imageId);

                const isItemSelected = table.isSelected(imageId);
                const labelId = `slide-table-checkbox-${index}`;
                const collapsedIn = table.isMatchCollapsedRow(imageId);
                const hasJobs = jobs.length !== 0;
                const hasRunningJob = data.checkHasRunningJob(jobs);

                return (
                  <React.Fragment>
                    <ImageTableRow
                      image={image}
                      onTableRowClick={table.handleTableRowClick}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      isInSelection={table.isInSelection}
                      hasJobs={hasJobs}
                      hasRunningJob={hasRunningJob}
                      onSelect={table.handleSelect}
                    />
                    <ImageTableRowDetail
                      collapsedIn={collapsedIn}
                      image={image}
                      hasJobs={hasJobs}
                      jobs={jobs}
                      predictionStart={prediction.start}
                      predictionStop={prediction.stop}
                      onDeleteResult={data.handleDeleteResult}
                      userIsAdmin={userIsAdmin}
                      username={username}
                      checkIsJobRunning={data.checkIsJobRunning}
                    />
                  </React.Fragment>
                )
              })}

            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPage={table.rowsPerPage}
          rowsPerPageOptions={table.rowsPerPage}
          component="div"
          count={data.images.length}
          page={table.page}
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={table.handleChangePage}
        />
      </Paper>
    </div>
  )
}
