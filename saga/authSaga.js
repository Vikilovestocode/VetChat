import { put, takeLatest, all } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

function* loginSaga() {

    const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
      .then(response => response.json());
  
    yield put({ type: "NEWS_RECEIVED", json: json.articles || [{ error: json.message }] });
  }
  
export function* loginWatcher() {
    yield takeLatest(LOGIN_REQUEST, loginSaga)
}