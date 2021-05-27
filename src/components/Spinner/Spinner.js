import React from 'react';
import * as styles from './SpinnerStyles'

const Spinner = (props) => <img
  css={styles.spinnerImg}
  src="/images/load.gif"
  alt="spinner"
/>;

export default Spinner;
