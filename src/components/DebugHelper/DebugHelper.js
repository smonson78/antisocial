import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../auth';
import * as styles from './DebugHelperStyles';

class DebugHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem('debug') === 'show') {
      this.setState({ hidden: false });
    }
  }

  toggle() {
    if (this.state.hidden) {
      this.setState({hidden: false});
      window.localStorage.setItem('debug', 'show');
    } else {
      this.setState({hidden: true});
      window.localStorage.setItem('debug', 'hide');
    }
  }

  render() {
    const session = Auth.getSession() || {};
    return this.props.enabled ?
      <div css={styles.container(this.state.hidden)}>
        <div
          css={styles.closeButton(this.state.hidden)}
          onClick={this.toggle.bind(this)}
        />
        <span>SID: {session.sid || '[none]'}</span>
        <br/>
        <span>User ID: {session.userid || '[none]'}</span>
        <span>({session.username})</span>
      </div> : null;
  }
}

DebugHelper.propTypes = {
  enabled: PropTypes.bool.isRequired,
}

export default DebugHelper;
