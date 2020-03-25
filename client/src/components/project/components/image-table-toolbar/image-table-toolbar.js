import React from "react";
import clsx from "clsx";
import { Toolbar, Typography, Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import { useStyles } from "./styles";

export const ImageTableToolbar = (props) => {
    const { numSelected, isInSelection, onInSelection, onDeleteSelected, userIsAdmin } = props;

    const classes = useStyles();
    // const circularClasses = useCircularStyles();

    const renderTooltip = () => {
      if (userIsAdmin) {
        if (isInSelection) {
          return (
            <React.Fragment>
              <Tooltip title="Confirm">
                <IconButton aria-label="confirm" onClick={event => onDeleteSelected()}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Cancel">
                <IconButton aira-label="cancel" onClick={event => onInSelection()}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )
        } else {
          return (
            <Tooltip title="Delete">
              <IconButton aira-label="Delete" onClick={event => onInSelection()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )
        }
      }
    }

    return (
      <Toolbar
        // eslint-disable-next-line no-sequences
        className={clsx(classes.root), {
          [classes.highlight]: isInSelection,
        }}
      >
        {isInSelection ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            Delete {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Slides
          </Typography>
        )}

      {renderTooltip()}

      </Toolbar>
    )
}