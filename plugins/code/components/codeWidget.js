import styles from '../../../node_modules/react-codemirror/node_modules/codemirror/lib/codemirror.css';

import React, { PropTypes } from 'react';
import Codemirror from 'react-codemirror';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';

function updateCode () {
  log(arguments);
}

function codeWidget(props) {
  const { state } = props;
  const opts = {
      lineNumbers: true,
      mode: 'javascript'
  }

  return (
    <div>
      <Codemirror ref="editor" value="//type code here" options={opts} onChange={updateCode}/>
    </div>
  );
}

codeWidget.propTypes = {
  state: PropTypes.shape({}).isRequired
};

export default createWidgetContainer(codeWidget, {}, {
  titlePrefix: 'Code'
});
