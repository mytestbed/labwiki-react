import React from 'react';
import { connect } from 'react-redux';

import ContentContainer from './ContentContainer';

function app() {
  return (
    <div id="App" >
      <h1>Siiiigh</h1>
      <ContentContainer />
    </div>
  );
}

export default connect((state) => state)(app);
