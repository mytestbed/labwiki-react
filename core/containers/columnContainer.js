import styles from '../styles/style.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getWidgetInfo, warn } from '..';

function columnContainer(props) {
  function createWidget(ws, widgets) {
    const wState = widgets[ws.wid];
    const wType = wState.type;
    const wInfo = getWidgetInfo(wType);
    // log('WID: ', wInfo, wType, ws, wState);

    if (wInfo !== undefined) {
      return React.createElement(wInfo.component, { state: wState, key: ws.wid });
    }
    warn('Unknown widget type "', wType, '".');
    return React.createElement('div', { className: styles.unknownWidget, foo: 1, key: ws.wid });
  }

  const { column, widgets, width } = props;
  return (
    <div className={ styles.column } style={{ width: `${width}px` }} >
      { column.widgets.map(ws => createWidget(ws, widgets)) }
    </div>
  );
}

columnContainer.propTypes = {
  side: PropTypes.string.isRequired,
  column: PropTypes.shape({}).isRequired,
  widgets: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
};

export default connect()(columnContainer);

