import React from 'react';
import ReactDOM from 'react-dom';

import app from './core/index.js';

// List all plugins here to get them registered
import './plugins/wiki';
import './plugins/code';

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = app
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }
  let apprun = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(app, () => {
    setTimeout(apprun)
  })
}

app();
