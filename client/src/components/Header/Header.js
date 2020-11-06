import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import Modal from '../Modal';

import { modalsActions, userActions } from '../../actions';
import { modalsTypes } from '../../constants';

const modalParams = { isOpen: false, modalType: null, modalProps: {} };

class Header extends Component {
  constructor(props) {
    super(props);

    const { openModal, closeModal } = this.props;
    openModal({ ...modalParams });
    closeModal({ ...modalParams });
  }

  onAuthClick = type => {
    const { openModal } = this.props;

    modalParams.isOpen = true;
    modalParams.modalType = modalsTypes[type];

    openModal({ ...modalParams });
  };

  onLogOutClick = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const authorizebuttons = 'header-auth-buttons';
    const loinClassName = 'header-button';
    const { auth } = this.props;
    const { isLogin, userInfo } = auth;

    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            {isLogin && (
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
            {!isLogin && (
              <div className={authorizebuttons}>
                <Button className={loinClassName} color="inherit" name="login" onClick={() => this.onAuthClick('LOGIN')}>
                  Войти
                </Button>
                <span>/</span>
                <Button className={loinClassName} color="inherit" name="sign" onClick={() => this.onAuthClick('SIGN')}>
                  Зарегистрироваться
                </Button>
              </div>
            )}
            {isLogin && (
              <div className={authorizebuttons}>
                <Button className={loinClassName} color="inherit">
                  {userInfo.user.email}
                </Button>
                <span>&nbsp;/&nbsp;</span>
                <Button className={loinClassName} color="inherit">
                  {userInfo.user.name}
                </Button>
                <span>&nbsp;/&nbsp;</span>
                <Button className={loinClassName} color="inherit" onClick={this.onLogOutClick}>
                  Выйти
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Modal />
      </>
    );
  }
}

const putStateToProps = state => {
  const { modals, auth } = state;
  return {
    modals,
    auth
  };
};

const putActionsToProps = dispatch => {
  const { openModal, closeModal } = modalsActions;
  const { logout } = userActions;
  return {
    openModal: bindActionCreators(openModal, dispatch),
    closeModal: bindActionCreators(closeModal, dispatch),
    logout: bindActionCreators(logout, dispatch)
  };
};

export default connect(putStateToProps, putActionsToProps)(Header);
