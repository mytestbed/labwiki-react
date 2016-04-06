import styles from '../styles/style.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import WidgetHeader from '../components/widgetHeader';

function widgetContainer(props, bodyContainer, headerInfo) {
  const { key, state } = props;

  return (
    <div className={ styles.widget } key={key} >
      <WidgetHeader state={ state } headerInfo={ headerInfo } />
      { React.createElement(bodyContainer,
                            update(props, { className: { $set: styles.widgetBody } })) }
    </div>
  );
}

widgetContainer.propTypes = {
  key: PropTypes.string.isRequired,
  state: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default function (bodyContainer, events, headerInfo) {
  const connectedContainer = connect(null, events)(bodyContainer);
  const w = (props) => widgetContainer(props, connectedContainer, headerInfo);
  return connect(null, {})(w);
}
