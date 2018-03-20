import React from "react";
import Login from './../containers/Login';

const withAuthentication = Component => props => {
  if (!props.isAuthenticate) {
    return <Login {...props} />;
  }
  return <Component {...props} />;
};

export default withAuthentication;