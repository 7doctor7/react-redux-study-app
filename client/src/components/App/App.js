import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import Header from '../Header';
import StickyFooter from '../Footer';
import MainPage from '../MainPage';
// import PrivateRoute from '../PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);

    const { putAlertsActions } = this.props;
    const { clear } = putAlertsActions;
    // history.listen((location, action) => dispatch(alertActions.clear()));
    history.listen(() => clear());
    // clear();
  }

  render() {
    // const { alert } = this.props;

    return (
      <div className="App">
        <Header />
        {/* <Router history={history}>
          <PrivateRoute exact path="/" component={MainPage} />
          <Route path="/login" component={MainPage} />
        </Router> */}
        <div className="App_main-content">
          <MainPage />
        </div>
        <StickyFooter />
      </div>
    );
  }
}

const putActionsToProps = dispatch => {
  const { clear, success, error } = alertActions;
  return {
    putAlertsActions: {
      clear: bindActionCreators(clear, dispatch),
      success: bindActionCreators(success, dispatch),
      error: bindActionCreators(error, dispatch)
    }
  };
};

export default connect(state => state, putActionsToProps)(App);
