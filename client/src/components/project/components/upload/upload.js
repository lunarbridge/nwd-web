import React from "react";
import { Paper } from "@material-ui/core";

import { useStyles } from "./styles";
import { useUpload } from "../../hooks";
import { UploadToolbar } from "../upload-toolbar";
import { UploadInfoHelper } from "../upload-info-helper";
import { UploadInfoProgress } from "../upload-info-progress";

export const Upload = (props) => {
  const { projectId } = props;
  const classes = useStyles();
  const upload = useUpload({ projectId: projectId });
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UploadToolbar onUpload={upload.handleUpload} />
        {upload.isUploading ? 
          <UploadInfoProgress 
            file={upload.file}
            action={upload.action}
            uploadProgress={upload.uploadProgress}
            uploadedStatus={upload.uploadedStatus}
          /> :
          <UploadInfoHelper />
        }
      </Paper>
    </div>
  )
}