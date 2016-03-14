
/**
 * Mocking client-server processing
 */
import _state from './lw_state.json';

const TIMEOUT = 100;

export default {
  getState(cb, timeout) {
    setTimeout(() => cb(_state), timeout || TIMEOUT);
  },
};
