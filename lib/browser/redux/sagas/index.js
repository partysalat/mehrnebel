import { fork, all } from 'redux-saga/effects';
import createFogSaga from './createFogSaga';
import userInfoSaga from './userInfoSaga';
import mutexSaga from './mutex';
import bestlistInfoSaga from './bestlistInfoSaga';


export default function* rootSaga() {
  yield all([
    fork(userInfoSaga),
    fork(createFogSaga),
    fork(mutexSaga),
    fork(bestlistInfoSaga),
  ]);
}
