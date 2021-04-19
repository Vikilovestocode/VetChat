import { put, takeLatest, all } from 'redux-saga/effects';
import { ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE } from '../actions/consultAction';
import { getConsultations } from '../api/consultApi';
function* consultationSaga() {
    getConsultations()
}
  
export function* consultationWatcher() {
    yield takeLatest(ADD_PET_REQUEST, consultationSaga)
}