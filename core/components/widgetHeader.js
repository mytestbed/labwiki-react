/**
 * Implements the header bar for a wideget
 */
 import styles from '../styles/style.css';

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
      <form className={ styles.searchForm }>
        <label className={ styles.searchLabel }>Search</label>
        <input className={ styles.searchInput } />
      </form>
    );
  }

  const { state, headerInfo } = props;

  return (
    <div className={ styles.widgetHeader }>
      <span className={ styles.widgetTitle }>TITLEX</span>
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
