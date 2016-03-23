
import update from 'react-addons-update';
import experimentWidget from './components/experimentWidget.js';
import { registerWidget, registerReducer, warn, log } from '../../core';

const DOMAIN = 'expermient';

registerWidget('experiment', experimentWidget);

registerReducer(DOMAIN, (state, action) => {
  return state;
});
