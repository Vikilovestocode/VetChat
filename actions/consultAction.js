import { actionCreator, actionCreatorPayload} from './actionUtil';
// Login
export const ADD_PET_REQUEST = 'ADD_PET_REQUEST';
export const ADD_PET_SUCCESS = 'ADD_PET_SUCCESS';
export const ADD_PET_FAILURE = 'ADD_PET_FAILURE';

export const addPetRequest = actionCreatorPayload(ADD_PET_REQUEST);
export const addPetSuccess = actionCreatorPayload(ADD_PET_SUCCESS);
export const addPetFailure = actionCreatorPayload(ADD_PET_FAILURE);


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