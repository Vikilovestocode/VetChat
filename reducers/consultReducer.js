import {ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE}  from '../actions/consultAction';
import {ADD_MEDIA_REQUEST, ADD_MEDIA_SUCCESS, ADD_MEDIA_FAILURE, ADD_MEDIA_PROGRESS}  from '../actions/consultAction';
import { DEL_MEDIA_SUCCESS, DEL_MEDIA_FAILURE}  from '../actions/consultAction';

// Initial State
const initialState = {

  };// Reducers (Modifies The State And Returns A New State)
  const consultReducer = (state = initialState, action) => {
    console.log(' consult reducer', action.type);

    switch (action.type) {    // Login
      case ADD_PET_SUCCESS: {
        return {
          ...state,
          redirectToStep2: true,
          errorFlag: false
        }
      }
      case ADD_PET_FAILURE: {
        return {
          ...state,
          redirectToStep2: false,
          errorFlag: true
        }
      }
      case ADD_MEDIA_REQUEST: {
        return {
          ...state,
          errorFlag: false,
          mediaTaskList: addEmptyTaskMediaList(state, action.payload)
        }
      }
      case ADD_MEDIA_SUCCESS: {
        return {
          ...state,
          errorFlag: false,
          mediaTaskList: mapMediaTaskList(state, action.payload)
        }
      }
     case ADD_MEDIA_PROGRESS:{
        console.log(action.type, action.payload)
        return {
          ...state,
          errorFlag: false,
          // mediaTaskList: mapMediaTaskListProgress(state, action.payload)
        }
      } 
     case DEL_MEDIA_SUCCESS:{
        console.log(action.type, action.payload)
        return {
          ...state,
          errorFlag: false,
          mediaTaskList: deleteMediaTaskList(state, action.payload)
        }
      }  
      default: {
        return state;
      }
    }
  };// Exports


  function addEmptyTaskMediaList(state, payload){
    console.log('add media request reducer', state.mediaTaskList)
    if(state.mediaTaskList && Object.keys(state.mediaTaskList)){
      state.mediaTaskList[payload.pathUrl] = null;
      return state.mediaTaskList;
    } else {
      return {};
    }

  }

  function mapMediaTaskList(state, payload){
    console.log('add media mapMediaTaskList reducer', payload.pathUrl, payload.task )
      state.mediaTaskList[payload.pathUrl] = payload.task;
      return state.mediaTaskList;
  }
  
  // function mapMediaTaskListProgress(state, payload){
  //   console.log('mapMediaTaskListProgress', payload.pathUrl, payload.progressCnt )
  //   if(state.mediaTaskList){
  //     state.mediaTaskList[payload.pathUrl] = payload.progressCnt;
  //     return state.mediaTaskList;
  //   } 
  // }

  function deleteMediaTaskList(state, payload){
    console.log('deleteMediaTaskList', payload.pathUrl, payload.IsDeleted )
    if(state.mediaTaskList){
      delete state.mediaTaskList[payload.pathUrl];
      return state.mediaTaskList;
    } 
  }


  export default consultReducer;