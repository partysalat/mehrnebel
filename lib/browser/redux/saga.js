import { delay } from 'redux-saga';
import { call, put, takeEvery, fork, take } from 'redux-saga/effects';
import getInstance from '../app/login/httpService';
import { CREATE_FOG, createFogFailure, createFogSuccess, LOAD_USER, loadUserFailure, loadUserSuccess } from './actions';

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


function* createFog() {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.put, '/api/create-fog');
    yield put(createFogSuccess(user.data.data));
    yield delay(1000);
  } catch (e) {
    yield put(createFogFailure(e.message));
  }
}

function* createFogSaga() {
  while (true) {
    const action = yield take(CREATE_FOG);
    yield createFog(action);
  }
}


export default function* rootSaga() {
  yield [
    fork(userInfoSaga),
    fork(createFogSaga),
  ];
}
