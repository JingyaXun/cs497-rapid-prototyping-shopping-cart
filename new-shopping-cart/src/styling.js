import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>

    </div>
  );
}

// <Grid container spacing={1}>
//   <Grid container item xs={12} spacing={5}>
//
//   </Grid>
//   <Grid container item xs={12} spacing={5}>
//     <FormRow />
//   </Grid>
//   <Grid container item xs={12} spacing={5}>
//     <FormRow />
//   </Grid>
//   <Grid container item xs={12} spacing={5}>
//     <FormRow />
//   </Grid>
// </Grid>
