import React, { Component } from 'react';
import * as styles from './FooterStyles';
import * as globalStyles from '../../globalStyles';

class Footer extends Component {

  render() {
    return <div css={styles.footer}>
      <div css={styles.background}>
        <div css={styles.left} />
        <div css={styles.right} />
      </div>
      <div css={styles.content}>
      </div>
    </div>
  }
}

export default Footer;
