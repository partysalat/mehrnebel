import { delay } from 'redux-saga';
import { call, cancel, fork, put, take, all } from 'redux-saga/effects';
import getInstance from '../../app/login/httpService';
import {
  CLAIM_MUTEX_TOKEN,
  CREATE_FOG,
  CREATE_FOG_BUTTON_RELEASED,
  CREATE_FOG_SIMPLE,
  LOOSE_MUTEX_TOKEN,
  createFogFailure,
  createFogStarted,
  createFogSuccess,
} from './../actions';

const FOG_TIMEOUT = 1000;

function* createFogEvent() {
  try {
    yield put(createFogStarted());
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
  yield take(CLAIM_MUTEX_TOKEN);
  while (true) {
    yield take(CREATE_FOG);

    const createFogTask = yield fork(createInfiniteFog);

    yield take(CREATE_FOG_BUTTON_RELEASED);
    yield cancel(createFogTask);
  }
}

function* createFogSimpleSaga() {
  yield take(CLAIM_MUTEX_TOKEN);
  while (true) {
    yield take(CREATE_FOG_SIMPLE);
    yield createFogEvent();
    yield delay(FOG_TIMEOUT);
  }
}


export default function* () {
  while (true) {
    const fogSaga = yield fork(createFogSaga);
    const fogSagaSimple = yield fork(createFogSimpleSaga);

    yield take(LOOSE_MUTEX_TOKEN);

    yield cancel(fogSaga);
    yield cancel(fogSagaSimple);
  }
}
