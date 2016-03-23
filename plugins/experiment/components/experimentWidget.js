import styles from './styles.css';

import React, { PropTypes } from 'react';
import { log } from '../../../core';
import createWidgetContainer from '../../../core/containers/widgetContainer';


function experimentWidget(props) {
  const { state } = props;

  return (
    <div className={ styles.experimentModule }>
      <p>{ state.content }</p>
    </div>
  );
}

experimentWidget.propTypes = {
  state: PropTypes.shape({}).isRequired
};

export default createWidgetContainer(experimentWidget, {}, {
  titlePrefix: 'Experiment'
});
