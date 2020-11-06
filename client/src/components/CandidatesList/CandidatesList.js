import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Box, Tab, Tabs, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { getAllDivisions as fetchDivisions } from '../../actions';

const TabPanel = props => {
  const { children = {}, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>
        {children}
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const a11yProps = index => ({
  id: `action-tab-${index}`,
  'aria-controls': `action-tabpanel-${index}`
});

class CandidatesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  async componentDidMount() {
    const { getAllDivisions } = this.props;
    await getAllDivisions();
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    const { divisions } = this.props;
    const { records, error, loading } = divisions;

    return (
      <div className="candidates__root">
        {loading && <p>Loading...</p>}
        {!loading && records.length && (
          <>
            <AppBar position="static" color="default" className="candidates__tabs-header">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="action tabs example"
              >
                {records.map((tab, index) => (
                  <Tab key={tab.id} label={tab.name} {...a11yProps(index)} />
                ))}
              </Tabs>
            </AppBar>
            <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
              {records.map((tab, index) => (
                <TabPanel key={tab.id} value={index} index={index}>
                  <div> {tab.description} </div>
                </TabPanel>
              ))}
            </SwipeableViews>
          </>
        )}
        {error && <p>Server ERROR...</p>}
      </div>
    );
  }
}

const putStateToProps = state => {
  const { divisions } = state;
  return {
    divisions
  };
};

const putActionsToProps = dispatch => {
  return {
    getAllDivisions: bindActionCreators(fetchDivisions, dispatch)
  };
};

export default connect(putStateToProps, putActionsToProps)(CandidatesList);
