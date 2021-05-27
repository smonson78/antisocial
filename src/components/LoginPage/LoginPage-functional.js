import React, { useState, useRef } from 'react';
// import { Redirect } from 'react-router-dom';
import { useRouter } from 'next/router';

import BasePageContainer from '../BasePageContainer/BasePageContainer';
import Spinner from '../Spinner/Spinner';

import globals from '../globals';
import Auth from '../auth';

const LoginPage = () => {

  const [waiting, setWaiting] = useState(false);
  //const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [authErrorText, setAuthErrorText] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

/*
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      authenticated: false,
      authError: false,
      authErrorText: null,
    };
  }

*/

  const authenticate = (event) => {

    //this.setState({ waiting: true, authError: false, authErrorText: null });
    setWaiting(true);
    setAuthError(false);
    setAuthErrorText(null);

    event.preventDefault();
    Auth.doAuth(
      this.emailRef.value,
      this.passwordRef.value
    ).then(sid => {
      //this.setState({ waiting: false, authenticated: true });
      setWaiting(false);
      //setAuthenticated(true);
      router.push(`${globals.pathPrefix}/`);

      console.log('authenticated OK');
    }, errorMsg => {
      console.log('Authentication error');
      //this.setState({ waiting: false, authError: true });
      setWaiting(false);
      setAuthError(true);
    });
  }

  return (
    <BasePageContainer container="loginpage-content-category-container">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input name="email" ref={emailRef} type="text"/>
        <br/>
        <label htmlFor="password">Password</label>
        <input name="password" ref={passwordRef} type="password"/>
        <br/>
        <input
          type="submit"
          disabled={waiting ? true : false}
          onClick={authenticate}
        />
        { waiting && <Spinner />}
        { authError &&
          <div>
            Authentication error - please check your username and password.<br />
            { authErrorText }
          </div>
        }
      </form>
      {
        /* authenticated && <Redirect to={`${globals.pathPrefix}/`} /> */
      }
    </BasePageContainer>
  );
};

export default LoginPage;
