import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


function render(props, Component, isAuth) {
  return isAuth
    ? <Component {...props} />
    : <Redirect to="/sign-in" />;
}

const PrivateRoute = ({ component, isAuth, ...rest }) => (
  <Route {...rest} render={props => render(props, component, isAuth)} />
);

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
