// Imports: Dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';// Imports: Redux
import rootReducer from '../reducers/index';// Middleware: Redux Persist Config
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
import createTransform from 'redux-persist/es/createTransform';

const sagaMiddleware = createSagaMiddleware();

 
const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    console.log(' inboundState:>::::', inboundState)
    return { ...inboundState};
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    console.log(' outboundState:::::', outboundState)
    return { ...outboundState };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['someReducer'] }
); 

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'authReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
  ],
  transforms: [SetTransform]
};// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    sagaMiddleware
  ),
);// Middleware: Redux Persist Persister

sagaMiddleware.run(rootSaga)

let persistor = persistStore(store);// Exports
export {
  store,
  persistor,
};