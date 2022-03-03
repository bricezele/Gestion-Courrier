import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from '../redux/index';
import rootSagas from "../sagas";
import thunk from 'redux-thunk';

const middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware);

const store = createStore(reducers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSagas);

export default store;