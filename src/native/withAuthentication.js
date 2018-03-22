import React from "react";
import Authentication from './../containers/Authentication';

const withAuthentication = Component => props => {
  if (!props.isAuthenticate) {
    return <Authentication {...props} />;
  }
  return <Component {...props} />;
};

export default withAuthentication;