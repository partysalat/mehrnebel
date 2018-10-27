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

export const CREATE_FOG = 'CREATE_FOG';
export const CREATE_FOG_SIMPLE = 'CREATE_FOG_SIMPLE';
export const CREATE_FOG_STARTED = 'CREATE_FOG_STARTED';
export const CREATE_FOG_SUCCESS = 'CREATE_FOG_SUCCESS';
export const CREATE_FOG_FAILED = 'CREATE_FOG_FAILURE';
export const CREATE_FOG_BUTTON_RELEASED = 'CREATE_FOG_BUTTON_RELEASED';
export function createFog() {
  return {
    type: CREATE_FOG,
  };
}
export function createFogSimple() {
  return {
    type: CREATE_FOG_SIMPLE,
  };
}
export function createFogSuccess(userData) {
  return {
    type: CREATE_FOG_SUCCESS,
    data: userData,
  };
}
export function createFogStarted(userData) {
  return {
    type: CREATE_FOG_STARTED,
    data: userData,
  };
}
export function createFogFailure(message) {
  return {
    type: CREATE_FOG_FAILED,
    error: message,
  };
}

export function createFogButtonReleased() {
  return {
    type: CREATE_FOG_BUTTON_RELEASED,
  };
}

export const INIT_MUTEX = 'INIT_MUTEX';
export function initMutex() {
  return {
    type: INIT_MUTEX,
  };
}

export const CLAIM_MUTEX_TOKEN = 'CLAIM_MUTEX_TOKEN';
export const LOOSE_MUTEX_TOKEN = 'LOOSE_MUTEX_TOKEN';
export function claimMutexToken(e) {
  return {
    type: CLAIM_MUTEX_TOKEN,
  };
}
export function looseMutexToken() {
  return {
    type: LOOSE_MUTEX_TOKEN,
  };
}
