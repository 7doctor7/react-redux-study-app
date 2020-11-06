import { modalsConstants } from '../constants';

export const modalsActions = {
  openModal,
  closeModal
};

function openModal(modalParams) {
  return {
    type: modalsConstants.OPEN_MODAL,
    payload: { ...modalParams }
  };
}

function closeModal(modalParams) {
  return {
    type: modalsConstants.CLOSE_MODAL,
    payload: { ...modalParams }
  };
}
