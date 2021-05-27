import React from 'react';
import Head from 'next/head'

import AdminPage from '../src/components/AdminPage/AdminPage';

export default function Admin() {

  return (
    <div>
      <Head>
        <title>AntiSocial - Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminPage />

    </div>
  )
}
