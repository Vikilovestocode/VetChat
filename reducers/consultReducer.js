import {ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE,ADD_STEP2_REQUEST, ADD_STEP2_SUCCESS}  from '../actions/consultAction';
import {ADD_MEDIA_REQUEST, ADD_MEDIA_SUCCESS, ADD_MEDIA_FAILURE, ADD_MEDIA_PROGRESS}  from '../actions/consultAction';
import { DEL_MEDIA_SUCCESS, DEL_MEDIA_REQUEST, DEL_MEDIA_FAILURE, GET_CHATMSG_SUCCESS, SEND_CHATMSG}  from '../actions/consultAction';
import { GET_IMG_URL_SUCCESS, VIEW_CONSULT }  from '../actions/consultAction';

// Initial State
const initialState = {
  consultationObj : {},
  currMsgImgUlrMap: {} ,
  newconsultationObj: {}
  //  { id: "loq3TyIJrTKZeZavnu26", userId: "CAlfN74J0xy02gE2lBfE" }
  };// Reducers (Modifies The State And Returns A New State)
  const consultReducer = (state = initialState, action) => {
    console.log(' consult reducer', action.type);

    switch (action.type) {    // Login

      case ADD_STEP2_REQUEST:
      case DEL_MEDIA_REQUEST:
      case ADD_PET_REQUEST: {
        return {
          ...state,
          loading: true,
        }
      }   
      case ADD_PET_SUCCESS: {
        return {
          ...state,
          loading: false,
          redirectToStep2: true,
          errorFlag: false,
          newconsultationObj: action.payload
        }
      }
      case ADD_STEP2_SUCCESS:{
        return{
          ...state,
          loading: false,
          redirectToChat: true
        }
      }
      case ADD_PET_FAILURE: {
        return {
          ...state,
          loading: false,
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
          loading: false,
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
          loading: false,
          errorFlag: false,
          mediaTaskList: deleteMediaTaskList(state, action.payload)
        }
      } 
     case GET_CHATMSG_SUCCESS:{
        return {
          ...state,
          errorFlag: false,
          chatMsgs: 
          (function () {
            console.log(' chat success payload ', action.payload)
            if( action.payload && action.payload.chat)
               return action.payload.chat.map(c => { c.createdAt = c.createdAt.toDate(); return c;}).reverse()
             else 
                return [] 
          })()
          
        }
      }
     case SEND_CHATMSG: {
       console.log(SEND_CHATMSG, ' --- ', action.payload)
      return {
        ...state,
        chatMsgs: [...action.payload]
      }
     }   
     case GET_IMG_URL_SUCCESS: {
      return {
        ...state,
        currMsgImgUlrMap: (function () {
          if(!Object.keys(state.currMsgImgUlrMap).includes(action.payload.pathUrl))
            state.currMsgImgUlrMap[action.payload.pathUrl] =action.payload.dloadUlr;

            return state.currMsgImgUlrMap  
        })()
      }
     };
      case VIEW_CONSULT: {
        return {
          ...state,
          loading: false,
          newconsultationObj: null,
          consultationObj: action.payload.consult,
          isEdit: action.payload.isEdit
        }
      };
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