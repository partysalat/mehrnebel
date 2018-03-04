import { delay } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import getInstance from '../../app/login/httpService';
import {
  CREATE_FOG,
  CREATE_FOG_BUTTON_RELEASED,
  CREATE_FOG_SIMPLE,
  createFogFailure,
  createFogSuccess,
} from './../actions';

const FOG_TIMEOUT = 1000;

function* createFogEvent() {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.put, '/api/create-fog');
    yield put(createFogSuccess(user.data.data));
  } catch (e) {
    yield put(createFogFailure(e.message));
  }
}

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


export default function* () {
  yield [
    fork(createFogSaga),
    fork(createFogSimpleSaga),
  ];
}
