import { fetchDivisions } from '../constants';
import { apiCall } from '../services';

const ENDPOINT = 'divisions';
const GET = 'GET';
const { CALL_DIVISIONS, CALL_DIVISIONS_ERROR, SUCCESS_DIVISIONS } = fetchDivisions;

export const getAllDivisions = () => async dispatch => {
  dispatch({ type: CALL_DIVISIONS });

  try {
    const divisions = await apiCall({ GET, url: ENDPOINT });
    dispatch({
      type: SUCCESS_DIVISIONS,
      payload: { ...divisions }
    });
  } catch (err) {
    dispatch({
      type: CALL_DIVISIONS_ERROR,
      payload: {}
    });
  }
};
