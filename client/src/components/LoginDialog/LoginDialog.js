import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { textLabels } from '../../constants';
import { modalsActions, userActions } from '../../actions';

const { LOGIN_LABELS, BUTTON_LABELS } = textLabels;

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);

    const { modals } = this.props;
    const { isOpen } = modals;

    this.handleClose = this.handleClose.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: isOpen,
      // username: '',
      // password: ''
      username: 'test1@test.com',
      password: 'wwwwww'
    };
  }

  handleClose = () => {
    const { username, password } = this.state;
    const { closeModal, modals, login } = this.props;

    if (username.length && password.length) {
      this.setState({ show: false });
      modals.isOpen = false;
      modals.modalProps = { username, password };

      login(username, password);
      closeModal({ ...modals });
    }
  };

  handleDiscard = () => {
    this.setState({
      show: false,
      username: '',
      password: ''
    });

    const { closeModal, modals } = this.props;

    modals.isOpen = false;
    modals.modalProps = {};

    closeModal({ ...modals });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, show } = this.state;
    const compProps = {
      disableBackdropClick: true,
      disableEscapeKeyDown: true
    };

    return (
      <div>
        <Dialog open={show} onClose={this.handleClose} {...compProps} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{LOGIN_LABELS.formTitle}</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="username"
              value={username}
              label={LOGIN_LABELS.email}
              type="email"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="password"
              value={password}
              label={LOGIN_LABELS.pass}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDiscard} color="primary">
              {BUTTON_LABELS.discardDefault}
            </Button>
            <Button onClick={this.handleClose} color="primary">
              {BUTTON_LABELS.confirmLogin}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const putStateToProps = state => {
  const { modals } = state;
  return {
    modals
  };
};

const putActionsToProps = dispatch => {
  const { closeModal } = modalsActions;
  const { login } = userActions;

  return {
    closeModal: bindActionCreators(closeModal, dispatch),
    login: bindActionCreators(login, dispatch)
  };
};

export default connect(putStateToProps, putActionsToProps)(LoginDialog);
