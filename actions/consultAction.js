import { actionCreator, actionCreatorPayload} from './actionUtil';
// Login
export const ADD_PET_REQUEST = 'ADD_PET_REQUEST';
export const ADD_PET_SUCCESS = 'ADD_PET_SUCCESS';
export const ADD_PET_FAILURE = 'ADD_PET_FAILURE';

export const addPetRequest = actionCreator(ADD_PET_REQUEST);
export const addPetSuccess = actionCreator(ADD_PET_SUCCESS);
export const addPetFailure = actionCreator(ADD_PET_FAILURE);
