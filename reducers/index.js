// Imports: Dependencies
import { combineReducers } from 'redux';// Imports: Reducers
import authReducer from './authReducer';
import consultReducer from './consultReducer';
import consultList from './consultListReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  consultReducer,
  consultList
});// Exports
export default rootReducer;