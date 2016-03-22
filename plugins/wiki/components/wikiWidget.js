import styles from '../../../core/styles/style.css';
//import stylesDraft from '../../../node_modules/draft-js/dist/Draft.css';

import React, { PropTypes } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import update from 'react-addons-update';

import { searchInText } from '..';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';

function updateWiki () {
  log(arguments);
}

function wikiWidget(props) {
  const { state } = props;
  const onChange = (editorState) => update(state, { editorState: { $set: editorState }});
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(state.editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }
  state.editorState = EditorState.createEmpty();

  return (
    <div className={ styles.wikiWidget }>
      <Editor
        editorState={state.editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={updateWiki}
        placeholder={ state.content } />
    </div>
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
