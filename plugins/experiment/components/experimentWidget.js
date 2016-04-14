import styles from './styles.css';

import React, { PropTypes } from 'react';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';
import chart from '../../../core/img/chart.svg';

function _dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.src);
}

function experimentWidget(props) {
  const { state } = props;

  return (
    <div className={ styles.experimentModule }>
      <p>{ state.content }</p>
      <div>
        <img draggable="true" onDragStart={_dragStart} style={{margin: '1.5rem 1rem'}} src={ chart } />
      </div>
    </div>
  );
}

experimentWidget.propTypes = {
  state: PropTypes.shape({}).isRequired
};

export default createWidgetContainer(experimentWidget, { }, {
  titlePrefix: 'Experiment'
});
