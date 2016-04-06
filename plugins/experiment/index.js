
import update from 'react-addons-update';
import experimentWidget from './components/experimentWidget.js';
import { registerWidget, registerReducer, warn, log } from '../../core';
import { DOMAIN as SYSTEM_DOMAIN, RESOURCE_ADDED } from '../../core/reducers';

const DOMAIN = 'expermient';

registerWidget('experiment', experimentWidget);

registerReducer(DOMAIN, (state, action) => {
  return state;
});

/**
 * Check all resources and record an associated action
 * if the content type calls for it.
 */
function appendAction(state, action) {
  const r = state.resources[action.rid];
  if (r.resourceType === 'text/oedl') {
    console.log("BEFORE: ", state, action);
    const a = {};
    a[action.rid] = update(state.actions[action.rid], { $push: [{
      wname: 'experiment',
    }] });
    const s = update(state, { actions: { $merge: a } });
    return s;
  }
  return state;
}

registerReducer(SYSTEM_DOMAIN, (state, action) => {
  switch (action.type) {
    case RESOURCE_ADDED:
      return appendAction(state, action);
    default:
      return state;
  }
});
