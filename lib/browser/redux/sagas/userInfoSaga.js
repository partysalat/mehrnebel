import { call, put, takeEvery } from 'redux-saga/effects';
import getInstance from '../../app/login/httpService';
import { LOAD_USER, loadUserFailure, loadUserSuccess } from './../actions';

function* fetchUser() {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.get, '/api/user');
    yield put(loadUserSuccess(user.data.data));
  } catch (e) {
    yield put(loadUserFailure(e.message));
  }
}

export default function* () {
  yield takeEvery(LOAD_USER, fetchUser);
}
