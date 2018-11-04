import { combineReducers } from 'redux';
import {
  CLAIM_MUTEX_TOKEN,
  CLAIM_MUTEX_TOKEN_SUCCESS,
  CREATE_FOG_STARTED,
  CREATE_FOG_SUCCESS, LOAD_BEST_LIST, LOAD_BEST_LIST_SUCCESS,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOAD_USER_SUCCESS,
  LOOSE_MUTEX_TOKEN,
  NEW_CLAIMER,
} from './actions';

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
    case CLAIM_MUTEX_TOKEN_SUCCESS:
      return {
        ...state,
        isClaimPending: false,
        isClaimed: true,
      };
    case CLAIM_MUTEX_TOKEN:
      return {
        ...state,
        isClaimPending: true,
      };
    case LOOSE_MUTEX_TOKEN:
      return {
        ...state,
        isClaimed: false,
      };
    default:
      return state;
  }
}

function userReducer(state = [], action) {
  switch (action.type) {
    case CREATE_FOG_STARTED:
      return {
        ...state,
        stats: {
          ...state.stats,
          buzzerClicked: (state.stats ? state.stats.buzzerClicked + 1 : 1),
        },
      };
    case CREATE_FOG_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...action.data,
      };
    default:
      return state;
  }
}
function lastClaimerReducer(state = {}, action) {
  switch (action.type) {
    case NEW_CLAIMER:
      return action.user || '';
    default:
      return state;
  }
}
function bestlistReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_BEST_LIST_SUCCESS:
      return action.bestlist || [];
    default:
      return state;
  }
}
export default combineReducers({
  state: stateReducer,
  user: userReducer,
  bestlist: bestlistReducer,
  lastClaimer: lastClaimerReducer,

});
