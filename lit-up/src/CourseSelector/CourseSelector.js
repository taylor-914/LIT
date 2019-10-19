import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>STOCKS &amp; BONDS</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>ACCOUNT TYPES</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>BROKERAGES</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>IINDICES</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>WHAT'S RIGHT FOR YOU</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>ETFs &amp; MUTUAL FUNDS</Paper>
        </Grid>
      </Grid>
    </div>
  );
}