import { call, put, takeEvery } from 'redux-saga/effects';
import getInstance from '../../app/login/httpService';
import { LOAD_BEST_LIST, LOAD_USER, loadBestListSuccess, loadUserFailure, loadUserSuccess } from './../actions';

function* fetchUser() {
  try {
    const client = yield call(getInstance);
    const bestlist = yield call(client.get, '/api/best-list');
    yield put(loadBestListSuccess(bestlist.data.data));
  } catch (e) {
    yield put(loadUserFailure(e.message));
  }
}

export default function* () {
  yield takeEvery(LOAD_BEST_LIST, fetchUser);
}
