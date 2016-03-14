
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import WidgetHeader from '../components/widgetHeader';

function widgetContainer(props, bodyContainer, headerInfo) {
  const { state } = props;

  return (
    <div className="widget" key={state.wid} >
      <WidgetHeader state={ state } headerInfo={ headerInfo } />
      { React.createElement(bodyContainer,
                            update(props, { className: { $set: 'widgetBody' } })) }
    </div>
  );
}

widgetContainer.propTypes = {
  state: PropTypes.shape({}).isRequired,
  flashRequest: PropTypes.func,
};

export default function (bodyContainer, events, headerInfo) {
  const connectedContainer = connect(null, events)(bodyContainer);
  const w = (props) => widgetContainer(props, connectedContainer, headerInfo);
  return connect(null, {})(w);
}
