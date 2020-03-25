import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  mapContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100vh'
  },
  map: {
    flexGrow: 1
  }
}));