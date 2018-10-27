import { fork, all } from 'redux-saga/effects';
import createFogSaga from './createFogSaga';
import userInfoSaga from './userInfoSaga';
import mutexSaga from './mutex';


export default function* rootSaga() {
  yield all([
    fork(userInfoSaga),
    fork(createFogSaga),
    fork(mutexSaga),
  ]);
}
