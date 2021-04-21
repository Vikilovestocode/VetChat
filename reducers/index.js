// Imports: Dependencies
import { combineReducers } from 'redux';// Imports: Reducers
import authReducer from './authReducer';
import consultReducer from './consultReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  consultReducer
});// Exports
export default rootReducer;