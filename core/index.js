import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import App from './containers/App';
import { initialState, onInit as lwOnInit } from './reducers';

export function log(...items) {
  console.log(...items);
}

export function warn(...items) {
  console.warn(...items);
}

// PLUGINS
let name2widget;
if (name2widget === undefined) name2widget = {}; // imports seem to be called out of order


export function registerWidget(name, component) {
  if (name2widget === undefined) name2widget = {};
  name2widget[name] = { component };
  log('Register widget: ', name);
}

export function getWidgetInfo(name) {
  return name2widget[name];
}

let domain2reducer;
if (domain2reducer === undefined) domain2reducer = {}; // imports seem to be called out of order
export function registerReducer(domain, reducer) {
  if (domain2reducer === undefined) domain2reducer = {};
  domain2reducer[domain] = reducer;
  log('Register reducer for domain: ', domain);
}

/**
 * This single top level reducer assumes that each event contains
 * it's own 'domain' top level reducer which handles the event for
 * the respective domain (plugin)
 */
function topReducer(state, action) {
  // log('REDUCER: ', state, ' a: ', action, ' r: ', action.domain);
  if (action.type === '@@INIT') {
    return initialState();
  }
  if (action.domain === undefined) {
    warn('Missing "domain" in "', action, '"');
    return state;
  }
  const reducer = domain2reducer[action.domain];
  if (reducer === undefined) {
    warn('Missing "reducer" for domain "', action.domain, '"');
    return state;
  }
  return reducer(state, action);
}

const middleware = process.env.NODE_ENV === 'production' ?
  [thunk] : [thunk, logger()];

const store = createStore(
  topReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension() : f => f
  )
);

lwOnInit(store);

export default function start() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
