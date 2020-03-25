import React from "react";
import { FormControl, InputLabel, TableRow, TableCell, MenuItem, Select, Collapse, Button, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import { useImageTableRowDetail } from "../../hooks";
import { Title } from "../title";
import { processStatus } from "../../../../constants";

export const ImageTableRowDetail = (props) => {
  const classes = useStyles();
  const { collapsedIn, image, hasJobs, jobs, predictionStart, predictionStop, onDeleteResult, userIsAdmin, checkIsJobRunning } = props;

  const imageTableRowDetail = useImageTableRowDetail({ jobs: jobs, hasJobs: hasJobs });
  const currentSelectedResult = imageTableRowDetail.currentSelectedResult();

  const renderStatus = () => {
    return (
      <div>
        <p>{currentSelectedResult.id}</p>
        <p>{processStatus[currentSelectedResult.status]}</p>
        <p>{currentSelectedResult.progress}%</p>
        <p>{currentSelectedResult.status_comment}</p>
        {/* <p>{currentSelectedResult.username}</p> */}
      </div>
    );
  }

  const renderProcessControl = () => {
    const isRunning = checkIsJobRunning(currentSelectedResult);
    // const userIsJobOwner = currentSelectedResult.username === username;
    // const modifiable = userIsAdmin || currentSelectedResult.username === username;

    if (isRunning) {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={event => predictionStop({jobId: imageTableRowDetail.selectedResultId})}
        >
          Stop
        </Button>
      );
    } else {
      if (userIsAdmin) {
        return (
          <Button
            variant="outlined"
            color="secondary"
            onClick={event => onDeleteResult(imageTableRowDetail.selectedResultId)}
          >
            Delete
          </Button>
        );
      } else {
        return (
          <Button
            variant="outlined"
            color="secondary"
            disabled
            onClick={event => onDeleteResult(imageTableRowDetail.selectedResultId)}
          >
            Delete
          </Button>
        );
      }
    }
  }

  const renderViewerLink = () => {
    const isResultSuccess = processStatus[currentSelectedResult.status] === "SUCCESS";

    if (isResultSuccess) {
      return (
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to={{
            pathname: '/viewer',
            state: {
              image: image,
              jobUserId: currentSelectedResult.job_user_id
            }
          }}
        >
          Open Viewer
        </Button>
        
        // <Link to={{
        //   pathname: '/viewer',
        //   state: {
        //     image: image,
        //     jobUserId: currentSelectedResult.job_user_id
        //   }
        // }}>
        //   <Button 
        //     variant="outlined"
        //     color="primary"
        //   >
        //     Open Viewer
        //   </Button>
        // </Link>
      )
    } else {
      return (
        <Button 
          variant="outlined"
          color="primary"
          disabled
        >
          Open Viewer
        </Button>
      )
    }
  }

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
        <Collapse
          in={collapsedIn}
          timeout="auto"
          unmountOnExit
        >
          <Title>Prediction</Title>

          {hasJobs && (
            <div>
            <div>
              {currentSelectedResult && (
                renderStatus()
              )}
            </div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Result
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={imageTableRowDetail.selectedResultId}
                defaultValue={imageTableRowDetail.selectedResultId}
                onChange={imageTableRowDetail.handleSelectResult}
              >
                {jobs.map((value, index) => {
                  return <MenuItem value={value.id}>{value.created}</MenuItem>
                })}
              </Select>
              {jobs.length >= 2 && (
                <FormHelperText>{jobs.length} results</FormHelperText>
              )}
            </FormControl>
          </div>
          )}

          <Button 
            variant="outlined"
            color="primary" 
            onClick={event => predictionStart({ imageInstanceId: image.id })}
          >
            Start
          </Button>

          {currentSelectedResult && (
            <React.Fragment>
              {renderProcessControl()} 
              {renderViewerLink()}
            </React.Fragment>
          )}

        </Collapse>
      </TableCell>
    </TableRow>
  )
}