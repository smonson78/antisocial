import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as styles from './HeaderStyles';
import globals from '../globals';

const Header = (props) => (
  <div css={styles.header}>
    <Link href={`${globals.pathPrefix}`}>
      <a css={styles.centre}>
        <img css={styles.logo} src="/images/logo.png" alt="Site logo" />
      </a>
    </Link>
  </div>
);


Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.number,
};

Header.defaultProps = {
  cartItemCount: 0,
};

export default Header;
