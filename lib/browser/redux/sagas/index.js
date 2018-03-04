import { fork } from 'redux-saga/effects';
import createFogSaga from './createFogSaga';
import userInfoSaga from './userInfoSaga';


export default function* rootSaga() {
  yield [
    fork(userInfoSaga),
    fork(createFogSaga),
  ];
}
