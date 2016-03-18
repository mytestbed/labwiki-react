
import update from 'react-addons-update';
import codeWidget from './components/codeWidget.js';
import { registerWidget, registerReducer, warn, log } from '../../core';

const DOMAIN = 'code';

registerWidget('code', codeWidget);

registerReducer(DOMAIN, (state, action) => {
  switch (action.type) {
    case FLASH_START:
      return update(state, { widgets: { [action.widget.wid]: { flashed: { $set: true } } } });
    case FLASH_END:
      return update(state, { widgets: { [action.widget.wid]: { flashed: { $set: false } } } });
    default:
      warn('Unknown "code" action "', action, '".');
      return state;
  }
});



