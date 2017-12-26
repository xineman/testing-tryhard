import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserBox = ({ auth, user }) => (
  auth
    ? <Link to="/profile">{user.username}</Link>
    : <Link to="/sign-in">Sign In</Link>
);

UserBox.propTypes = {
  auth: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default connect(state => ({
  auth: state.auth.isAuth,
  user: state.user,
}))(UserBox);
