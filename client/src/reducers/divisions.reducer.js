import { fetchDivisions } from '../constants';

const {
  SUCCESS_DIVISIONS,
  CALL_DIVISIONS,
  CREATE_NEW_DIVISION,
  UPDATE_DIVISION,
  DELETE_DIVISION,
  CALL_DIVISIONS_ERROR
} = fetchDivisions;

const initialState = {
  records: [],
  loading: false,
  error: false
};

export function divisions(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CALL_DIVISIONS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SUCCESS_DIVISIONS:
      return {
        ...state,
        records: [...payload.rows],
        loading: false,
        error: false
      };
    case CREATE_NEW_DIVISION:
      return {
        ...state,
        newDivision: { ...payload },
        loading: false,
        error: false
      };
    case UPDATE_DIVISION:
      return {
        ...state,
        records: [...payload.rows],
        loading: false,
        error: false
      };
    case DELETE_DIVISION:
      return {
        ...state,
        records: [...payload.rows],
        loading: false,
        error: false
      };
    case CALL_DIVISIONS_ERROR:
      console.log('ERROR payload => ', payload);
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
