import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest, takeEvery, all, call, select } from 'redux-saga/effects';
import { ADD_PET_REQUEST, DEL_MEDIA_REQUEST, ADD_PET_FAILURE, SAVE_CHAT_MSG_REQUEST,
    ADD_MEDIA_REQUEST, addMediaSuccess, addMediaFailure,
    addPetSuccess, addPetFailure, addMediaUploadProgress, deleteMediaSuccess, deleteMediaFailure, saveChatMsgSuccess, saveChatMsgFailure, keepMeidaLocallyReq, getConsultationsSuccess, getConsultationsFailure, GET_CONSULT_REQUEST } from '../actions/consultAction';
import { ADD_STEP2_REQUEST, addConsltStep2Success, addConsltStep2Failure } from '../actions/consultAction';
import { getConsultations, saveConsultationStep1,  consultationImgUpload, deleteMedia, 
    saveConsultationStepTwo, saveConsultationChat, getConsultationObj, getMediaUrl } from '../api/consultApi';
import { MEDIA_LOCALLY_REQUEST, keepMeidaLocallySuccess, keepMeidaLocallyFailure } from '../actions/consultAction';
import { GET_CHATMSG_REQUEST, getChatMessageSuccess, getChatMessageFailure } from '../actions/consultAction';
import { GET_IMG_URL_REQUEST, getImageDloadUrlSuccess, getImageDloadUrlFailure } from '../actions/consultAction';

import { createFileLocallyBfrUpload } from '../utils/fileUtil';
import { initialChatMsg } from '../utils/chatUtils';

function* consultationSaga(action) {
    try{
        const data = yield call(saveConsultationStep1, action.payload)
        console.log('##### consultationSaga #', data)
        yield put(addPetSuccess(data))
    } catch(e){
        console.log('addPetFailure',e)
        console.error(e)
        yield put(addPetFailure(e))
    }
}

export function* consultationWatcher() {
    yield takeLatest(ADD_PET_REQUEST, consultationSaga)
}


function* consultationSagaStepTwo(action) {
    try{
        console.log(' consultationSagaStepTwo::::', action )
        const data = yield call(saveConsultationStepTwo, action.payload)
        const step1Obj = yield select(({consultReducer})=>(consultReducer.newconsultationObj))
        console.log(' consultationSagaStepTwo:::step1Obj:', step1Obj.data() )
        const msgList = initialChatMsg({...step1Obj.data(), ...action.payload})
        for (const value of msgList) {
            yield call(saveConsultationChat,  action.payload.id, value)
        }
        yield put(addConsltStep2Success(action.payload))
    } catch(e){
        console.log(" error on consultationSagaStepTwo: ", e)
        yield put(addConsltStep2Failure(e))
    }
}

export function* consultationStep2Watcher() {
    yield takeLatest(ADD_STEP2_REQUEST, consultationSagaStepTwo)
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


export function* chatMessageWatcher() {
    yield takeEvery(SAVE_CHAT_MSG_REQUEST, saveChatMsgSaga)
}

function* saveChatMsgSaga(action) {
    try{
        const {id, ...chatMsgArr } =  action.payload;
        const msg = chatMsgArr[0]? chatMsgArr[0]: chatMsgArr;
        if(msg.audio)
            msg.audio = msg.pathUrl;
        if(msg.video)
            msg.video = msg.pathUrl;   
        console.log(' msg saga', msg)
        const data = yield call(saveConsultationChat, id, msg)
        yield put(saveChatMsgSuccess(data))
        // yield put(keepMeidaLocallyReq({pathUrl: msg.pathUrl, file: msg.file}))
    } catch(e){
        console.log('saveChatMsgSaga: error :', e)
        yield put(saveChatMsgFailure(e))
    }
}

function* mediaCacheLocalSaga(action) {
    try{
        const { file, pathUrl } = action.payload;
        const data = yield call(createFileLocallyBfrUpload, file, pathUrl)
        // yield put(keepMeidaLocallySuccess(data))
    } catch(e){
        console.error('mediaCacheLocalSaga: error :', e)
        console.log('mediaCacheLocalSaga: error :', e)
        yield put(keepMeidaLocallyFailure(e))
    }
}

export function* mediaCacheLocalWatcher() {
    yield takeEvery(MEDIA_LOCALLY_REQUEST, mediaCacheLocalSaga)
}

function* fetchChatMessageSaga(action) {
    try{
        const data = yield call(getConsultationObj, action.payload.id)
        yield put(getChatMessageSuccess(data))
    } catch(e){
        console.error('fetchChatMessageSaga: error :', e)
        console.log('fetchChatMessageSaga: error :', e)
        yield put(getChatMessageFailure(e))
    }
}

export function* fetchChatMessageWatcher() {
    yield takeEvery(GET_CHATMSG_REQUEST, fetchChatMessageSaga)
}

function* getImageUrlSaga(action) {
    try{
        console.log('getImageUrlSaga: payload before check:', action.payload, yield AsyncStorage.getItem(action.payload))
        let data = yield AsyncStorage.getItem(action.payload)
        if(!data){
            data = yield call(getMediaUrl, action.payload)
            if(data)
                yield AsyncStorage.setItem(action.payload, data)
        }
        yield put(getImageDloadUrlSuccess({ pathUrl: action.payload, dloadUlr: data }))
    } catch(e){
        console.error('getImageDloadUrlFailure: error :', e)
        console.log('getImageUrlSaga: error :', e)
        yield put(getImageDloadUrlFailure(e))
    }
}

export function* getImageUrlWatcher() {
    yield takeEvery(GET_IMG_URL_REQUEST, getImageUrlSaga)
}



function* getConsultationSaga(action) {
    try{
        const data = yield call(getConsultations, action.payload)
        console.log('##### getConsultations #', data)
        yield put(getConsultationsSuccess(data))
    } catch(e){
        console.log('getConsultationSaga',e)
        yield put(getConsultationsFailure(e))
    }
}

export function* getConsultationWatcher() {
    yield takeLatest(GET_CONSULT_REQUEST, getConsultationSaga)
}
