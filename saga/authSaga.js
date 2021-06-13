import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_REQUEST, SIGNUP_REQUEST, signUpSuccess, signUpFailure, loginFailure, loginSuccess, loginRequest } from '../actions/authActions';
import { getUserByPhoneNo, saveUser, signUp, loginUser } from '../api/authApi';

function* signUpSaga(action) {
  try {
    let data = yield call(getUserByPhoneNo, action.payload)
    if(!data){
      yield call(signUp, action.payload)
      data = yield call(saveUser, action.payload)
    }
    console.log('signUpSaga: signUpSuccess :', data)
    yield call(loginUser, data)
    yield put(signUpSuccess(data))
  } catch (e) {
    console.error('signUpSaga: error :', e)
    console.log('signUpSaga: error :', e)
    yield put(signUpFailure(e))
  }
}

export function* signUpWatcher() {
    yield takeLatest(SIGNUP_REQUEST, signUpSaga)
}


function* loginSaga(action) {
  // try {
  //   yield call(loginUser, action.payload)
  // } catch (e) {
  //   console.error('loginSaga: error :', e)
  //   console.log('loginSaga: error :', e)
  //   yield put(loginFailure(e))
  // }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}