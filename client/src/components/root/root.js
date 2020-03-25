import React from 'react';
import { Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../util';

export const Root = (props) => {

  if (isAuthenticated()) {
    return (
      <Redirect to={{
        pathname: '/projects'
      }}/>
    )
  } else {
    return (
      <Redirect to={{
        pathname: '/auth/login'
      }}/>
    )
  }
}