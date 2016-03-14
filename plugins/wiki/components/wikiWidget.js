import React, { PropTypes } from 'react';

import { flashRequest, searchInText } from '..';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';

function wikiWidget(props) {
  function onFlashRequest() {
    props.flashRequest(props.state);
  }
  const { state } = props;
  const className = (state.flashed ? 'widgetBody wFlashed' : 'widgetBody');

  return (
    <div className={ className } key={state.wid} >
      <p style={{ lineHeight: '120px' }} >
        WIKI
      </p>
      <p style={{ padding: '20px' }} >
        <button onClick={ onFlashRequest }>
          Press Me!
        </button>
      </p>
    </div>
  );
}

wikiWidget.propTypes = {
  state: PropTypes.shape({}).isRequired,
  flashRequest: PropTypes.func.isRequired,
};

const events = { flashRequest };
export default createWidgetContainer(wikiWidget, events, {
  titlePrefix: 'Wiki',
  search: {
    event: searchInText,
  },
});