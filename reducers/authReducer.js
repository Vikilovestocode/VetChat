import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS}  from '../actions/authActions';

// Initial State
const initialState = {
  user: null,
  };// Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    console.log(' auth reuduer ', action);
    switch (action.type) {    // Login
      case SIGNUP_SUCCESS: {
        return {
          // State
          ...state,
          // Redux Store
          user: action.payload,
        }
      }    // Default
      case LOGIN_SUCCESS: {
        return {
          // State
          ...state,
        }
      } 
      default: {
        return state;
      }
    }
  };// Exports
  export default authReducer;