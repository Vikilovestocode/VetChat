import { actionCreator, actionCreatorPayload} from './actionUtil';
// Login
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signUpRequest = actionCreatorPayload(SIGNUP_REQUEST);
export const signUpSuccess = actionCreatorPayload(SIGNUP_SUCCESS);
export const signUpFailure = actionCreatorPayload(SIGNUP_FAILURE);
