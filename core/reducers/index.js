import throttle from 'lodash.throttle';
import update from 'react-addons-update';

import labwiki from '../api/labwiki';
import { registerReducer, log, warn } from '../';

// Event types
const DOMAIN = 'lw';
const RECEIVE_GLOBAL_STATE = `${DOMAIN}:RECEIVE_GLOBAL_STATE`;
const WINDOW_RESIZED = `${DOMAIN}:WINDOW_RESIZED`;

function appendWindowSize(state) {
  return update(state, { window: {
    $set: { height: window.innerHeight, width: window.innerWidth } } });
}

export function initialState() {
  return appendWindowSize({
    left: {
      width: 0.4,
      widgets: [],
    },
    right: {
      width: 0.6,
      widgets: [],
    },
    widgets: {},
  });
}

// EVENTS

function getCurrentState() {
  return dispatch => {
    labwiki.getState(state => {
      // dispatch(receiveState(state))
      dispatch({
        type: RECEIVE_GLOBAL_STATE,
        domain: DOMAIN,
        state,
      });
    });
  };
}

function onWindowResize() {
  return appendWindowSize({
    type: WINDOW_RESIZED,
    domain: DOMAIN,
  });
}

export function reducer(state, action) {
  switch (action.type) {
    case RECEIVE_GLOBAL_STATE:
      return appendWindowSize(action.state);
    case WINDOW_RESIZED:
      return appendWindowSize(state);
    default:
      warn('Unknown global action "', action, '"');
      return state;
  }
}

/**
 * Called after the store is created initially
 */
export function onInit(store) {
  store.dispatch(getCurrentState());
  registerReducer(DOMAIN, reducer);

  window.addEventListener('resize',
    throttle(() => store.dispatch(onWindowResize()), 10));
}


