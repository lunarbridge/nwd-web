import { makeStyles, lighten } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight: {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    },
    title: {
        flex: '1 1 100%'
    },
    input: {
        display: 'none',
    },
    row: {
        display: 'flex'
    }
}));
  
export const useCircularStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
            '& > * + *': {
        marginLeft: theme.spacing(2),
        },
    },
}));