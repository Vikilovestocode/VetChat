import { put, takeLatest, all, call } from 'redux-saga/effects';
import { ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE, 
    ADD_MEDIA_REQUEST, addMediaSuccess, addMediaFailure,
    addPetSuccess, addPetFailure } from '../actions/consultAction';
import { getConsultations, saveConsultationStep1, consultationImgUpload } from '../api/consultApi';

function* consultationSaga(action) {
    try{
        const data = yield call(() =>  saveConsultationStep1(action.payload))
        yield put(addPetSuccess(data))
    } catch(e){
        yield put(addPetFailure(data))
    }
}

export function* consultationWatcher() {
    yield takeLatest(ADD_PET_REQUEST, consultationSaga)
}
  
function* uploadMediaSaga({payload}) {
    try{
        const data = yield call(() =>  consultationImgUpload(action.payload))
        yield put(addMediaSuccess({pathUrl: payload.pathUrl, task: data}))
    } catch(e){
        yield put(addMediaFailure(data))
    }
}

export function* uploadMediaWatcher() {
    yield takeLatest(ADD_MEDIA_REQUEST, uploadMediaSaga)
}
