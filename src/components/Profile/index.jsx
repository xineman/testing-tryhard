import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import styles from './styles.css';


const Profile = ({ user, logout: handleLogout }) => (
  <div>
    <div className={styles.infoContainer}>
      <p className={styles.textBold}>Username:</p>
      <p className={styles.text}>{user.username}</p>
    </div>
    <button className="button" onClick={() => handleLogout()}>Logout</button>
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(state => ({
  user: state.user,
}), { logout })(Profile);
