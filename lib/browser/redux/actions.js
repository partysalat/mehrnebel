export const LOGIN_TRIGGERED = 'LOGIN_TRIGGERED';
export const LOGOUT_TRIGGERED = 'LOGOUT_TRIGGERED';
export function login() {
  return {
    type: LOGIN_TRIGGERED,
  };
}
export function logout() {
  return {
    type: LOGOUT_TRIGGERED,
  };
}

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILED = 'LOAD_USER_FAILED';
export function loadUser() {
  return {
    type: LOAD_USER,
  };
}
export function loadUserSuccess(userData) {
  return {
    type: LOAD_USER_SUCCESS,
    data: userData,
  };
}
export function loadUserFailure(message) {
  return {
    type: LOAD_USER_FAILED,
    error: message,
  };
}
