import { all } from '@redux-saga/core/effects';
import { loginWatcher } from './authSaga';
import { consultationWatcher, uploadMediaWatcher } from './consultationSaga';
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    consultationWatcher(),
    uploadMediaWatcher()
  ]);
}