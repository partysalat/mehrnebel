import { fork } from 'redux-saga/effects';
import createFogSaga from './createFogSaga';
import userInfoSaga from './userInfoSaga';
import mutexSaga from './mutex';


export default function* rootSaga() {
  yield [
    fork(userInfoSaga),
    fork(createFogSaga),
    fork(mutexSaga),
  ];
}
