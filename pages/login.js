import React from 'react';
import Head from 'next/head'

import LoginPage from '../../src/components/LoginPage/LoginPage';

export default function Login() {

  return (
    <div>
      <Head>
        <title>AntiSocial - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage />

    </div>
  )
}
