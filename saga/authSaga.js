import { put, takeLatest, call } from 'redux-saga/effects';
import { SIGNUP_REQUEST, signUpSuccess, signUpFailure } from '../actions/authActions';
import { getUserByPhoneNo, saveUser } from '../api/authApi';

function* loginSaga(action) {
  try {
    let data = yield call(getUserByPhoneNo, action.payload)
    if(!data){
      data = yield call(saveUser, action.payload)
    }
    console.error('loginSaga: signUpSuccess :', data)
    yield put(signUpSuccess(data))
  } catch (e) {
    console.error('loginSaga: error :', e)
    console.log('loginSaga: error :', e)
    yield put(signUpFailure(e))
  }
}

export function* loginWatcher() {
    yield takeLatest(SIGNUP_REQUEST, loginSaga)
}