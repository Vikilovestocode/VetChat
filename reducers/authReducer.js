import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE}  from '../actions/authActions';

// Initial State
const initialState = {
  user: null,
  };// Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {    // Login
      case SIGNUP_SUCCESS: {
        return {
          // State
          ...state,
          // Redux Store
          user: action.payload,
        }
      }    // Default
      default: {
        return state;
      }
    }
  };// Exports
  export default authReducer;