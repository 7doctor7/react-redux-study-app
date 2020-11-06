import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { modalsActions, userActions } from '../../actions';
import { textLabels } from '../../constants';

const { SIGN_LABELS, BUTTON_LABELS } = textLabels;

class SignUpDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { modals } = this.props;
    const { isOpen } = modals;

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: isOpen,
      name: '',
      username: '',
      password: '',
      confirm: ''
    };
  }

  handleClose = () => {
    const { name, username, password, confirm } = this.state;
    const { closeModal, modals, signup } = this.props;

    if (name.length && password.length && confirm.length && username.length) {
      if (password !== confirm) {
        return;
      }

      this.setState({ show: false });
      modals.isOpen = false;
      modals.modalProps = { name, username, password };

      signup(name, username, password);
      closeModal({ ...modals });
    }
  };

  handleDiscard = () => {
    this.setState({
      show: false,
      name: '',
      username: '',
      password: '',
      confirm: ''
    });

    const { closeModal, modals } = this.props;

    modals.isOpen = false;
    modals.modalProps = {};

    closeModal({ ...modals });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { show, name, username, password, confirm } = this.state;

    return (
      <div>
        <Dialog open={show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{SIGN_LABELS.formTitle}</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="name"
              value={name}
              label={SIGN_LABELS.name}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="username"
              value={username}
              label={SIGN_LABELS.email}
              type="email"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="password"
              value={password}
              label={SIGN_LABELS.pass}
              type="password"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="confirm"
              value={confirm}
              label={SIGN_LABELS.confirm}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDiscard} color="primary">
              {BUTTON_LABELS.discardDefault}
            </Button>
            <Button onClick={this.handleClose} color="primary">
              {BUTTON_LABELS.confirmSign}
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
  const { signup } = userActions;
  return {
    closeModal: bindActionCreators(closeModal, dispatch),
    signup: bindActionCreators(signup, dispatch)
  };
};

export default connect(putStateToProps, putActionsToProps)(SignUpDialog);
