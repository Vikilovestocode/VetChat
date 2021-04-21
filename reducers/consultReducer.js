import {ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE}  from '../actions/consultAction';
import {ADD_MEDIA_REQUEST, ADD_MEDIA_SUCCESS, ADD_MEDIA_FAILURE}  from '../actions/consultAction';

// Initial State
const initialState = {

  };// Reducers (Modifies The State And Returns A New State)
  const consultReducer = (state = initialState, action) => {
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
      // Default
      default: {
        return state;
      }
    }
  };// Exports


  function addEmptyTaskMediaList(state, payload){

    if(state.mediaTaskList && state.mediaTaskList.keys()){
      state.mediaTaskList.set(payload.pathUrl, null)
      return state.mediaTaskList;
    } else {
      return new Map();
    }

  }

  function mapMediaTaskList(state, payload){

    if(state.mediaTaskList && state.mediaTaskList.has(payload.pathUrl)){
      state.mediaTaskList.set(payload.pathUrl, payload.task)
      return state.mediaTaskList;
    } 
  }
  export default consultReducer;