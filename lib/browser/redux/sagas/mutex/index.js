import { call, cancel, fork, put, take } from 'redux-saga/effects';
import * as iotClient from './iotClient';
import { INIT_MUTEX, CLAIM_MUTEX_TOKEN } from './../../actions';


function* claimMutexSaga() {
  yield take(CLAIM_MUTEX_TOKEN);
  yield call(iotClient.send, 'claim!');

}

export default function* () {
  yield take(INIT_MUTEX);
  yield call(iotClient.connect);
  yield claimMutexSaga();
}
