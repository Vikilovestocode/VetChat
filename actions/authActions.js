import { actionCreator, actionCreatorPayload} from './actionUtil';
// Login
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signUpRequest = actionCreatorPayload(SIGNUP_REQUEST);
export const signUpSuccess = actionCreatorPayload(SIGNUP_SUCCESS);
export const signUpFailure = actionCreatorPayload(SIGNUP_FAILURE);

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = actionCreatorPayload(LOGIN_REQUEST);
export const loginFailure = actionCreatorPayload(LOGIN_SUCCESS);
export const loginSuccess = actionCreatorPayload(LOGIN_FAILURE);
