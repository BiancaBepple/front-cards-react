/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function RouteWrapper({ user, component: Component, isPrivate, ...rest }) {
  let signed = false;

  if (user.length > 0) {
    signed = true;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  user: PropTypes.array.isRequired,
  isPrivate: PropTypes.bool,
  component: PropTypes.any.isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(RouteWrapper);
