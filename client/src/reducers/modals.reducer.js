import { modalsConstants } from '../constants';

const { OPEN_MODAL, CLOSE_MODAL } = modalsConstants;

const initialState = {
  isOpen: false,
  modalType: null,
  modalProps: {}
};

export function modals(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: payload.isOpen,
        modalType: payload.modalType,
        modalProps: payload.modalProps
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: '',
        modalProps: {}
      };
    default:
      return state;
  }
}
