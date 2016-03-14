
import { registerReducer, log, warn } from '../';


// Event types
const DOMAIN = 'w-search';
const START_SEARCH = `${DOMAIN}:START_SEARCH`;

/**
 * Called whenever user types in header search bar
 */
export function startSearch(widget) {
  return {
    type: START_SEARCH,
    domain: DOMAIN,
    widget,
  };
}

registerReducer(DOMAIN, (state, action) => {
  switch (action.type) {
    default:
      warn('Unknown "w-search" action "', action, '".');
      return state;
  }
});
