import { call, cancel, fork, put, take, select, all } from 'redux-saga/effects';
import * as iotClient from './iotClient';
import * as visibilityStateService from './visibilityStateService';
import { INIT_MUTEX, CLAIM_MUTEX_TOKEN, looseMutexToken, newClaimer } from './../../actions';
import { delay } from 'redux-saga';

const randomId = `${Math.round(Math.random() * new Date().getTime())}`;

function* stopClaimSaga(onMessageChannel) {
  while (true) {
    const { clientId, user } = yield take(onMessageChannel);
    yield put(newClaimer(user));
    if (clientId !== randomId) {
      yield put(looseMutexToken());
    }
  }
}
function* claimMutexSaga() {
  while (true) {
    yield take(CLAIM_MUTEX_TOKEN);
    const user = yield select(state => state.user && state.user.username);
    yield call(iotClient.send, {
      clientId: randomId,
      user,
    });
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
    fork(stopClaimSaga.bind(null, onMessageChannel)),
    fork(changeVisibilityStateSaga),
    fork(claimMutexSaga),
  ]);
}
