import { combineReducers } from 'redux';
import { CREATE_FOG_SUCCESS, LOAD_USER, LOAD_USER_FAILED, LOAD_USER_SUCCESS } from './actions';

function stateReducer(state = [], action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isLoadingUserInformation: true,
      };
    case LOAD_USER_SUCCESS:
    case LOAD_USER_FAILED:
      return {
        ...state,
        isLoadingUserInformation: false,
      };
    default:
      return state;
  }
}

function userReducer(state = [], action) {
  switch (action.type) {
    case CREATE_FOG_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...action.data,
      };
    default:
      return state;
  }
}


export default combineReducers({
  state: stateReducer,
  user: userReducer,
});
