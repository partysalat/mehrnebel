import { call, cancel, fork, put, take, select } from 'redux-saga/effects';
import * as iotClient from './iotClient';
import { INIT_MUTEX, CLAIM_MUTEX_TOKEN, looseMutexToken } from './../../actions';
import { delay } from 'redux-saga';

const randomId = `${Math.round(Math.random() * new Date().getTime())}`;

function* stopClaimSaga(onMessageChannel) {
  while (true) {
    const claimedId = yield take(onMessageChannel);
    if (claimedId !== randomId) {
      yield put(looseMutexToken());
    }
  }
}
function* claimMutexSaga() {
  while (true) {
    yield take(CLAIM_MUTEX_TOKEN);
    yield call(iotClient.send, randomId);
  }
}

export default function* () {
  yield take(INIT_MUTEX);
  const { onMessageChannel } = yield call(iotClient.connect);
  yield fork(stopClaimSaga.bind(null, onMessageChannel));
  yield claimMutexSaga();
}
