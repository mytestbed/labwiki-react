
import update from 'react-addons-update';
import codeWidget from './components/codeWidget.js';
import { registerWidget, registerReducer, warn, log } from '../../core';

const DOMAIN = 'code';

registerWidget('code', codeWidget);

registerReducer(DOMAIN, (state, action) => {
  return state;
});



