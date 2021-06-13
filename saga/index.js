import { all } from '@redux-saga/core/effects';
import { loginWatcher, signUpWatcher } from './authSaga';
import { consultationWatcher, consultationStep2Watcher, uploadMediaWatcher, getConsultationWatcher, 
  deleteMediaWatcher, chatMessageWatcher, mediaCacheLocalWatcher, fetchChatMessageWatcher, getImageUrlWatcher } from './consultationSaga';
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    consultationWatcher(),
    uploadMediaWatcher(),
    deleteMediaWatcher(),
    consultationStep2Watcher(),
    chatMessageWatcher(),
    mediaCacheLocalWatcher(),
    fetchChatMessageWatcher(),
    getImageUrlWatcher(),
    getConsultationWatcher()
  ]);
}