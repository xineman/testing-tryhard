import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './styles.css';
import { login, getUser } from '../../actions';

class SignIn extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
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
      this.props.auth ?
        <Redirect to="/profile" /> :
        <form className={styles.form} method="post" onSubmit={e => this.handleLogin(e)}>
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
  auth: state.auth.isAuth,
}), { login, getUser })(SignIn);
