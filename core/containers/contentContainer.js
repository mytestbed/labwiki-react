import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ColumnContainer from './columnContainer';
import { log } from '../';

const LEFT_SIDE = 'left';
const RIGHT_SIDE = 'right';

function contentContainer(props) {
  function calcColumnWidth(side) {
    if (side === LEFT_SIDE) {
      const column = props[side];
      return column.width * props.window.width;
    }
    const leftWidth = calcColumnWidth(LEFT_SIDE);
    return props.window.width - leftWidth;
  }

  function calcColumnState(side) {
    const column = props[side];
    const { widgets } = props;
    return { side, column, widgets, width: calcColumnWidth(side) };
  }

  return (
    <div id="content" className="content" style={{ width: `${props.window.width || 900}px` }}>
      { React.createElement(ColumnContainer, calcColumnState(LEFT_SIDE)) }
      { React.createElement(ColumnContainer, calcColumnState(RIGHT_SIDE)) }
    </div>
  );
}

contentContainer.propTypes = {
  window: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
  widgets: PropTypes.shape({}).isRequired,
};

export default connect((store) => store)(contentContainer);
