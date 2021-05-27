import { actionCreator, actionCreatorPayload} from './actionUtil';
// Login
export const ADD_PET_REQUEST = 'ADD_PET_REQUEST';
export const ADD_PET_SUCCESS = 'ADD_PET_SUCCESS';
export const ADD_PET_FAILURE = 'ADD_PET_FAILURE';

export const addPetRequest = actionCreatorPayload(ADD_PET_REQUEST);
export const addPetSuccess = actionCreatorPayload(ADD_PET_SUCCESS);
export const addPetFailure = actionCreatorPayload(ADD_PET_FAILURE);

export const ADD_STEP2_REQUEST = 'ADD_STEP2_REQUEST';
export const ADD_STEP2_SUCCESS = 'ADD_STEP2_SUCCESS';
export const ADD_STEP2_FAILURE = 'ADD_STEP2_FAILURE';

export const addConsltStep2Request = actionCreatorPayload(ADD_STEP2_REQUEST);
export const addConsltStep2Success = actionCreatorPayload(ADD_STEP2_SUCCESS);
export const addConsltStep2Failure = actionCreatorPayload(ADD_STEP2_FAILURE);


export const ADD_MEDIA_REQUEST = 'ADD_MEDIA_REQUEST';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

export const addMediaRequest = actionCreatorPayload(ADD_MEDIA_REQUEST);
export const addMediaSuccess = actionCreatorPayload(ADD_MEDIA_SUCCESS);
export const addMediaFailure = actionCreatorPayload(ADD_MEDIA_FAILURE);

export const ADD_MEDIA_PROGRESS = 'ADD_MEDIA_PROGRESS';
export const addMediaUploadProgress = actionCreatorPayload(ADD_MEDIA_PROGRESS);

export const DEL_MEDIA_REQUEST = 'DEL_MEDIA_REQUEST';
export const DEL_MEDIA_SUCCESS = 'DEL_MEDIA_SUCCESS';
export const DEL_MEDIA_FAILURE = 'DEL_MEDIA_FAILURE';

export const deleteMediaRequest = actionCreatorPayload(DEL_MEDIA_REQUEST);
export const deleteMediaSuccess = actionCreatorPayload(DEL_MEDIA_SUCCESS);
export const deleteMediaFailure = actionCreatorPayload(DEL_MEDIA_FAILURE);

export const SAVE_CHAT_MSG_REQUEST = 'SAVE_CHAT_MSG_REQUEST';
export const SAVE_CHAT_MSG_SUCCESS = 'SAVE_CHAT_MSG_SUCCESS';
export const SAVE_CHAT_MSG_FAILURE = 'SAVE_CHAT_MSG_FAILURE';

export const saveChatMsgRequest = actionCreatorPayload(SAVE_CHAT_MSG_REQUEST);
export const saveChatMsgSuccess = actionCreatorPayload(SAVE_CHAT_MSG_SUCCESS);
export const saveChatMsgFailure = actionCreatorPayload(SAVE_CHAT_MSG_FAILURE);


export const MEDIA_LOCALLY_REQUEST = 'MEDIA_LOCALLY_REQUEST';
export const MEDIA_LOCALLY_SUCCESS = 'MEDIA_LOCALLY_SUCCESS';
export const MEDIA_LOCALLY_FAILURE = 'MEDIA_LOCALLY_FAILURE';

export const keepMeidaLocallyReq = actionCreatorPayload(MEDIA_LOCALLY_REQUEST);
export const keepMeidaLocallySuccess = actionCreatorPayload(MEDIA_LOCALLY_SUCCESS);
export const keepMeidaLocallyFailure = actionCreatorPayload(MEDIA_LOCALLY_FAILURE);


export const GET_CHATMSG_REQUEST = 'GET_CHATMSG_REQUEST';
export const GET_CHATMSG_SUCCESS = 'GET_CHATMSG_SUCCESS';
export const GET_CHATMSG_FAILURE = 'GET_CHATMSG_FAILURE';

export const getChatMessageReq = actionCreatorPayload(GET_CHATMSG_REQUEST);
export const getChatMessageSuccess = actionCreatorPayload(GET_CHATMSG_SUCCESS);
export const getChatMessageFailure = actionCreatorPayload(GET_CHATMSG_FAILURE);

export const SEND_CHATMSG = 'SEND_CHATMSG';

export const sendChatMsg = actionCreatorPayload(SEND_CHATMSG);


export const GET_IMG_URL_REQUEST = 'GET_IMG_URL_REQUEST';
export const GET_IMG_URL_SUCCESS = 'GET_IMG_URL_SUCCESS';
export const GET_IMG_URL_FAILURE = 'GET_IMG_URL_FAILURE';

export const getImageDloadUrlReq = actionCreatorPayload(GET_IMG_URL_REQUEST);
export const getImageDloadUrlSuccess = actionCreatorPayload(GET_IMG_URL_SUCCESS);
export const getImageDloadUrlFailure = actionCreatorPayload(GET_IMG_URL_FAILURE);



export const GET_CONSULT_REQUEST = 'GET_CONSULT_REQUEST';
export const GET_CONSULT_SUCCESS = 'GET_CONSULT_SUCCESS';
export const GET_CONSULT_FAILURE = 'GET_CONSULT_FAILURE';

export const getConsultationsReq = actionCreatorPayload(GET_CONSULT_REQUEST);
export const getConsultationsSuccess = actionCreatorPayload(GET_CONSULT_SUCCESS);
export const getConsultationsFailure = actionCreatorPayload(GET_CONSULT_FAILURE);

export const VIEW_CONSULT = 'VIEW_CONSULT';

export const viewConsultation = actionCreatorPayload(VIEW_CONSULT);