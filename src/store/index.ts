import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import reducers from '../redux/index';
import rootSagas from "../sagas";
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
// @ts-ignore
const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export {store, persistor};