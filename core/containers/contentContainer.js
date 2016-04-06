import styles from '../styles/style.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ColumnContainer from './columnContainer';
import AppHeaderContainer from './appHeaderContainer.js';
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
    const { resources, data } = props;
    return { side, column, resources, data, width: calcColumnWidth(side) };
  }

  return (
    <div id="content" className={ styles.content } style={{ width: `${props.window.width || 900}px` }}>
      { React.createElement(AppHeaderContainer, props)}
      { React.createElement(ColumnContainer, calcColumnState(LEFT_SIDE)) }
      { React.createElement(ColumnContainer, calcColumnState(RIGHT_SIDE)) }
    </div>
  );
}

contentContainer.propTypes = {
  window: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
  resources: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default connect((store) => store)(contentContainer);
