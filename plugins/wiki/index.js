
import update from 'react-addons-update';
import wikiWidget from './components/wikiWidget';
import { registerWidget, registerReducer, warn, log } from '../../core';

const DOMAIN = 'wiki';
const FLASH_START = `${DOMAIN}:FLASH_START`;
const FLASH_END = `${DOMAIN}:FLASH_END`;

registerWidget('wiki', wikiWidget);

export function flashRequest(widget) {
  return (dispatch) => {
    dispatch({
      type: FLASH_START,
      domain: DOMAIN,
      widget,
    });

    // emit flash cancel event some time later
    setTimeout(() => {
      dispatch({
        type: FLASH_END,
        domain: DOMAIN,
        widget,
      });
    }, 2000);
  };
}

/**
 * Called whenever user types in header search bar
 */
export function searchInText(searchString) {
  return {
    type: FLASH_END,
    domain: DOMAIN,
    searchString,
  };
}

registerReducer(DOMAIN, (state, action) => {
  switch (action.type) {
    case FLASH_START:
      return update(state, { widgets: { [action.widget.wid]: { flashed: { $set: true } } } });
    case FLASH_END:
      return update(state, { widgets: { [action.widget.wid]: { flashed: { $set: false } } } });
    default:
      warn('Unknown "wiki" action "', action, '".');
      return state;
  }
});



