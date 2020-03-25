import React from 'react';

import { useStyles } from './styles';
import { useViewer } from './hooks';

export const Viewer = (props) => {
  const { image, jobUserId } = props.location.state;
  const classes = useStyles();

  const viewer = useViewer({ 
    image: image,
    jobUserId: jobUserId
  });

  return (
    <div className={classes.mapContainer}>
      <div className={classes.map} ref={viewer.mapRef} />
    </div>
  )
}