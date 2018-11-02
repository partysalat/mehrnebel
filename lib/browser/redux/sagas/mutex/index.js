import { all, call, fork, put, select, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as iotClient from './iotClient';
import * as visibilityStateService from './visibilityStateService';
import {
  CLAIM_MUTEX_TOKEN,
  CLAIM_MUTEX_TOKEN_SUCCESS,
  claimMutexTokenSuccess,
  INIT_MUTEX,
  looseMutexToken,
  newClaimer,
} from './../../actions';

const randomId = `${Math.round(Math.random() * new Date().getTime())}`;

function* newClaimerSaga(onMessageChannel) {
  while (true) {
    const { clientId, user } = yield take(onMessageChannel);
    yield put(newClaimer(user));
    if (clientId !== randomId) {
      yield put(looseMutexToken());
    } else {
      yield put(claimMutexTokenSuccess());
    }
  }
}
function* claimMutexSaga() {
  while (true) {
    yield take(CLAIM_MUTEX_TOKEN);
    console.log('CLAIM MUTEX SAGA STARTED');
    const user = yield select(state => state.user && state.user.username);
    yield call(iotClient.send, {
      clientId: randomId,
      user,
    });
    yield race([
      delay(10000),
      yield take(CLAIM_MUTEX_TOKEN_SUCCESS),
    ]);
  }
}
function* changeVisibilityStateSaga() {
  const channel = visibilityStateService.createEventChannel();
  while (true) {
    const isVisible = yield take(channel);
    if (!isVisible) {
      yield put(looseMutexToken());
    }
  }
}

export default function* () {
  yield take(INIT_MUTEX);
  const { onMessageChannel } = yield call(iotClient.connect);
  yield all([
    fork(newClaimerSaga.bind(null, onMessageChannel)),
    fork(changeVisibilityStateSaga),
    fork(claimMutexSaga),
  ]);
}
