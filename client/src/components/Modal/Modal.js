import React from 'react';
import { connect } from 'react-redux';

import LoginDialog from '../LoginDialog';
import SignUpDialog from '../SignUpDialog';

const MODALS_COMPONENTS = {
  LOGIN: LoginDialog,
  SIGN: SignUpDialog
};

const Modal = ({ modalType }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODALS_COMPONENTS[modalType];
  return <SpecificModal />;
};

export default connect(state => state.modals)(Modal);
