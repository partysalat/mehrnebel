import { delay } from 'redux-saga';
import { call, put, takeEvery, fork, take, cancel } from 'redux-saga/effects';
import getInstance from '../app/login/httpService';
import {
  CREATE_FOG,
  CREATE_FOG_BUTTON_RELEASED,
  LOAD_USER,
  createFogFailure,
  createFogSuccess,
  loadUserFailure,
  loadUserSuccess, CREATE_FOG_SIMPLE,
} from './actions';

function* fetchUser() {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.get, '/api/user');
    yield put(loadUserSuccess(user.data.data));
  } catch (e) {
    yield put(loadUserFailure(e.message));
  }
}

function* userInfoSaga() {
  yield takeEvery(LOAD_USER, fetchUser);
}
function* createFogEvent() {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.put, '/api/create-fog');
    yield put(createFogSuccess(user.data.data));
  } catch (e) {
    yield put(createFogFailure(e.message));
  }
}
const FOG_TIMEOUT = 1000;
function* createInfiniteFog() {
  while (true) {
    yield createFogEvent();
    yield delay(FOG_TIMEOUT);
  }
}

function* createFogSaga() {
  while (true) {
    yield take(CREATE_FOG);
    const createFogTask = yield fork(createInfiniteFog);

    yield take(CREATE_FOG_BUTTON_RELEASED);
    yield cancel(createFogTask);
  }
}

function* createFogSimpleSaga() {
  while (true) {
    yield take(CREATE_FOG_SIMPLE);
    yield createFogEvent();
    yield delay(FOG_TIMEOUT);
  }
}


export default function* rootSaga() {
  yield [
    fork(userInfoSaga),
    fork(createFogSaga),
    fork(createFogSimpleSaga),
  ];
}
