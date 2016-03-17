import React from 'react';
import { connect } from 'react-redux';

import ContentContainer from './ContentContainer';

function app() {
  return (
    <div id="App" >
      <ContentContainer />
    </div>
  );
}

export default connect((state) => state)(app);
