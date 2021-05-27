import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { getRouter } from 'next/router'

import BasePageContainer from '../BasePageContainer/BasePageContainer';
import Spinner from '../Spinner/Spinner';

import globals from '../globals';
import Auth from '../auth';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      authenticated: false,
      authError: false,
      authErrorText: null,
    };
  }

  authenticate = (event) => {
    this.setState({ waiting: true, authError: false, authErrorText: null });
    event.preventDefault();
    Auth.doAuth(
      this.emailRef.value,
      this.passwordRef.value
    ).then(sid => {
      this.setState({ waiting: false, authenticated: true });
      console.log('authenticated OK');
    }, errorMsg => {
      console.log('Authentication error');
      this.setState({ waiting: false, authError: true });
    });
  }

  render() {
    console.log('router:', getRouter());
    return (
      <BasePageContainer container="loginpage-content-category-container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input name="email" ref={ref => this.emailRef = ref} type="text"/>
          <br/>
          <label htmlFor="password">Password</label>
          <input name="password" ref={ref => this.passwordRef = ref} type="password"/>
          <br/>
          <input
            type="submit"
            disabled={this.state.waiting ? true : false}
            onClick={this.authenticate}
          />
          { this.state.waiting && <Spinner />}
          { this.state.authError &&
            <div>
              Authentication error - please check your username and password.<br />
              { this.state.authErrorText }
            </div>
          }
        </form>
        {
          this.state.authenticated
            && <Redirect to={`${globals.pathPrefix}/`} />
        }
      </BasePageContainer>
    );
  }
}

export default LoginPage;
