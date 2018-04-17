import 'babel-polyfill';
import './styles/less/reset.less';

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory  } from 'react-router';
// import logger from 'bragi-browser';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import reducers from './reducers/index';
import sagas from './sagas/index';
import routes from './routes.jsx';
import global from './common/global';
import './flexible.js';

import {getJSON} from 'common/dataservice';

getJSON.initHttpDTO({
    JsonDTO: {
        flag: 'result',
        message: 'message',
        data: 'data'
    },
    successFlag: 'ok'
})

//////////////////////
// Store


// const middlewares = [createSagaMiddleware(sagas)];
const middlewares = [];

//FIXME for test
if (module.hot) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const initialState = {};
const enhancer = compose(
  applyMiddleware(...middlewares)
);

const store = createStore(combineReducers({
  ...reducers, routing
}), initialState, enhancer);

global.store = store;

//////////////////////
// Render
const history = syncHistoryWithStore(hashHistory, store);

const rootEl =document.getElementById('app');

// window.$=$;
ReactDom.render(
    <Provider store={store}>
      <Router routes={routes} history={history}/>
    </Provider>
     , rootEl);
