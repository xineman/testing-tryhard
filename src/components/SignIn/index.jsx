import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './styles.css';
import { login, getUser } from '../../actions';
import Spinner from '../Spinner';

class SignIn extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isAuth: PropTypes.bool,
      isLoading: PropTypes.bool,
      token: PropTypes.string,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange({ target: input }) {
    this.setState({
      [input.name]: input.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.getUser());
  }

  render() {
    return (
      <form className={styles.form} method="post" onSubmit={e => this.handleLogin(e)}>
        {this.props.auth.isAuth && <Redirect to="/profile" />}
        <Spinner show={this.props.auth.isLoading} />
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
}), { login, getUser })(SignIn);
