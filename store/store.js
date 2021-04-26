// Imports: Dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';// Imports: Redux
import rootReducer from '../reducers/index';// Middleware: Redux Persist Config
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

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