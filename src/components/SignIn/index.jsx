import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './styles.css';
import { login, getUser } from '../../actions';
import Spinner from '../Spinner';
import Input from '../Input';

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
      valid: {
        username: false,
        password: false,
      },
      showErrors: false,
    };
  }

  handleChange({ target: input }) {
    this.setState({
      [input.name]: input.value,
      valid: {
        ...this.state.valid,
        [input.name]: RegExp(input.pattern).test(input.value),
      },
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      showErrors: true,
    });
    if (Object.values(this.state.valid).every(i => i)) {
      const { username, password } = this.state;
      this.props.login({ username, password })
        .then(() => this.props.getUser());
    }
  }

  render() {
    return (
      <form className={styles.form} method="post" onSubmit={e => this.handleLogin(e)}>
        {this.props.auth.isAuth && <Redirect to="/profile" />}
        <Spinner show={this.props.auth.isLoading} />
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username:</label>
          <Input
            type="email"
            name="username"
            id="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            invalid={!this.state.valid.username}
            showErrors={this.state.showErrors}
            placeholder="john@example.com"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            invalid={!this.state.valid.password}
            showErrors={this.state.showErrors}
            placeholder="8-15 symbols"
            pattern={'^.{8,15}$'}
          />
        </div>
        <button type="submit" className={`button ${styles.submit}`}>Login</button>
      </form>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
}), { login, getUser })(SignIn);
