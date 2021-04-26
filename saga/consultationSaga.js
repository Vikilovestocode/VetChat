import * as firebase from 'firebase';
import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import { ADD_PET_REQUEST, DEL_MEDIA_REQUEST, ADD_PET_FAILURE, 
    ADD_MEDIA_REQUEST, addMediaSuccess, addMediaFailure,
    addPetSuccess, addPetFailure, addMediaUploadProgress, deleteMediaSuccess, deleteMediaFailure } from '../actions/consultAction';
import { getConsultations, saveConsultationStep1, consultationImgUpload, deleteMedia } from '../api/consultApi';

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
        const data = yield call(() =>  consultationImgUpload(payload))
        console.log(' upload media saga', data);
        // data.on(firebase.storage.TaskEvent.STATE_CHANGED, function*(snapshot) {
        //     let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        //     console.log('api uploadTask progress:',percent + "% done");
        //     // yield put(addMediaUploadProgress({pathUrl: payload.pathUrl, task: data, progressCnt: percent}))
        //     progressCnt(payload.pathUrl, data, percent)
        //   });
        yield put(addMediaSuccess({pathUrl: payload.pathUrl, task: data}))
    } catch(e){
        console.error('uploadMediaSaga:',e)
        yield put(addMediaFailure(e))
    }
}

export function* uploadMediaWatcher() {
    yield takeEvery(ADD_MEDIA_REQUEST, uploadMediaSaga)
}


function* deleteMediaSaga({payload}) {
    try{
        const isDelted = yield call(() =>  deleteMedia(payload))
        console.log(' isDelted media saga', isDelted);
        // data.on(firebase.storage.TaskEvent.STATE_CHANGED, function*(snapshot) {
        //     let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        //     console.log('api uploadTask progress:',percent + "% done");
        //     // yield put(addMediaUploadProgress({pathUrl: payload.pathUrl, task: data, progressCnt: percent}))
        //     progressCnt(payload.pathUrl, data, percent)
        //   });
        yield put(deleteMediaSuccess({ pathUrl: payload.pathUrl, isDelted}))
    } catch(e){
        console.error(e)
        yield put(deleteMediaFailure({ isDelted: false }))
    }
}

export function* deleteMediaWatcher() {
    yield takeEvery(DEL_MEDIA_REQUEST, deleteMediaSaga)
}
