import React from "react";
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useStyles } from "./styles";

export const UploadToolbar = (props) => {
  const { onUpload } = props;
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="uploadTitle">
        Upload
      </Typography>

      <input className={classes.input} id="icon-button-file" type="file" onChange={event => onUpload(event)} />
      <label htmlFor="icon-button-file">
        <Tooltip title="Upload slide">
          <IconButton aria-label="upload-slide" component="span">
            <CloudUploadIcon />
          </IconButton>
        </Tooltip>
      </label>

    </Toolbar>
  )
}