import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import logo from '../../../public/assets/images/logo.svg';
import CandidatesList from '../CandidatesList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  content: {
    padding: theme.spacing(2),
    width: '100%'
  }
}));

const MainPage = props => {
  const classes = useStyles();
  const { auth } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          {!auth.isLogin && (
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              Пожалуйста авторизируйтесь в ситеме!
            </div>
          )}
          {auth.isLogin && (
            <div className={classes.content}>
              <CandidatesList />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const putStateToProps = state => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(putStateToProps)(MainPage);
