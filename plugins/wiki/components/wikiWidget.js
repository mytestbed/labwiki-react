import styles from './style.css';

import React, { PropTypes } from 'react';
import {Editor, EditorState} from 'draft-js';
import update from 'react-addons-update';

import { searchInText } from '..';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';


function wikiWidget(props) {
  const { state } = props;
  const onChange = (editorState) => update(state, { editorState: { $set: editorState }});

  state.editorState = EditorState.createEmpty();

  return (
    <Editor editorState={state.editorState} onChange={onChange} />
  );
}

wikiWidget.propTypes = {
  state: PropTypes.shape({}).isRequired
};

const events = {  };
export default createWidgetContainer(wikiWidget, events, {
  titlePrefix: 'Wiki',
  search: {
    event: searchInText,
  },
});
