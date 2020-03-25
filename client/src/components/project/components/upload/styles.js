import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    title: {
      flex: '1 1 100%'
    }
  }));