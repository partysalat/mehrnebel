import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import getInstance from '../app/login/httpService';
import { LOAD_USER, loadUserFailure, loadUserSuccess } from './actions';


function* fetchUser(action) {
  try {
    const client = yield call(getInstance);
    const user = yield call(client.get, '/api/user');
    yield put(loadUserSuccess(user.data.data));
  } catch (e) {
    yield put(loadUserFailure(e.message));
  }
}

function* userInfoSaga() {
  yield takeEvery(LOAD_USER, fetchUser);
}


export default userInfoSaga;
