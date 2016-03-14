/**
 * Implements the header bar for a wideget
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { log } from '..';
import { startSearch } from '../reducers/search';

function widgetHeader(props) {
  function onSearch() {
    log("SEARCH: ", props);
    props.startSearch(props.state);
  }

  function renderSearch() {
    const { headerInfo } = props;
    if (headerInfo === undefined) return;

    return (
      <button className="searchButton"
        onClick={ onSearch }
        style={{ float: 'right' }}
      >Search</button>
    );
  }
  
  const { state, headerInfo } = props;

  return (
    <div className="widgetHeader foo">
      <span className="widgetTitle">TITLEX</span>
      { renderSearch() }
    </div>
  );
}

widgetHeader.propTypes = {
  state: PropTypes.shape({}).isRequired,
  headerInfo: PropTypes.shape({}).isRequired,
  startSearch: PropTypes.func.isRequired,
};

export default connect(null, { startSearch })(widgetHeader);
