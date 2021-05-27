import React from 'react';
import Head from 'next/head'
import Homepage from '../src/components/Homepage/Homepage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AntiSocial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Homepage />

    </div>
  )
}
