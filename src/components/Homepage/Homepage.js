import React, { Component } from 'react';
import useUser from '../../lib/use-user';
import * as styles from './HomepageStyles';

const Homepage = (props) => {
  
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        Homepage
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Homepage;
