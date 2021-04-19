import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE}  from '../actions/authActions';

// Initial State
const initialState = {
    loggedIn: false,
  };// Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {    // Login
      case LOGIN_SUCCESS: {
        return {
          // State
          ...state,
          // Redux Store
          loggedIn: action.payload,
        }
      }    // Default
      default: {
        return state;
      }
    }
  };// Exports
  export default authReducer;