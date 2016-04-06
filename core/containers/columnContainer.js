import styles from '../styles/style.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getWidgetInfo, warn, log } from '..';

function columnContainer(props) {
  function createWidget(widget) {
    const wState = props.resources[widget.rid];
    log("Widget: ", widget, " - ", wState);
    const wType = widget.wtype;
    const wInfo = getWidgetInfo(wType);
    log('WID: ', wInfo, wType, wState);
    if (wInfo !== undefined) {
      return React.createElement(wInfo.component, { state: wState, key: widget.wid, data: props.data });
    }
    warn('Unknown widget type "', wType, '".');
    return React.createElement('div', { className: styles.unknownWidget, foo: 1, key: widget.wid });
  }

  const { column, width } = props;
  return (
    <div className={ styles.column } style={{ width: `${width}px` }} >
      { column.widgets.map(w => createWidget(w)) }
    </div>
  );
}

columnContainer.propTypes = {
  side: PropTypes.string.isRequired,
  column: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
  resources: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default connect()(columnContainer);

