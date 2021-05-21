import { all } from '@redux-saga/core/effects';
import { loginWatcher } from './authSaga';
import { consultationWatcher, consultationStep2Watcher, uploadMediaWatcher, 
  deleteMediaWatcher, chatMessageWatcher, mediaCacheLocalWatcher, fetchChatMessageWatcher, getImageUrlWatcher } from './consultationSaga';
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    consultationWatcher(),
    uploadMediaWatcher(),
    deleteMediaWatcher(),
    consultationStep2Watcher(),
    chatMessageWatcher(),
    mediaCacheLocalWatcher(),
    fetchChatMessageWatcher(),
    getImageUrlWatcher()
  ]);
}