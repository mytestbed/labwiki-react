import styles from '../styles/style.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { log } from '../';

function appHeaderContainer(props) {
  return (
    <header className={ styles.header }>
      <h1 className={ styles.headerTitle }>LabWiki2</h1>
      <div className={ styles.search }>Search</div>
      <div className={ styles.new }>New Project</div>
      <div className={ styles.info }>Notifications</div>
      <div className={ styles.user }>User</div>
    </header>
  );
}

export default connect()(appHeaderContainer);