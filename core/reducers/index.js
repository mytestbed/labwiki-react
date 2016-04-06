import throttle from 'lodash.throttle';
import update from 'react-addons-update';

import labwiki from '../api/labwiki';
import { registerReducer, log, warn } from '../';

// Event types
export const DOMAIN = 'lw';
export const RECEIVED_GLOBAL_STATE = `${DOMAIN}:RECEIVED_GLOBAL_STATE`;
export const RESOURCE_ADDED = `${DOMAIN}:RESOURCE_ADDED`;
export const WINDOW_RESIZED = `${DOMAIN}:WINDOW_RESIZED`;

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
    resources: {},
    data: {},
    actions: {},
  });
}

// EVENTS

function getCurrentState() {
  return dispatch => {
    labwiki.getState(state => {
      // dispatch(receiveState(state))
      dispatch({
        type: RECEIVED_GLOBAL_STATE,
        domain: DOMAIN,
        state,
      });
      Object.keys(state.resources).forEach(rid => {
        dispatch({
          type: RESOURCE_ADDED,
          domain: DOMAIN,
          rid,
          resource: state.resources[rid],
        });
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
    case RECEIVED_GLOBAL_STATE: {
      const actions = {};
      Object.keys(action.state.resources).map(k => (actions[k] = []));
      return update(appendWindowSize(action.state), { $merge: { actions } });
    }
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


