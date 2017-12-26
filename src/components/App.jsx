import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { getUser } from '../actions';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import SignIn from './SignIn';
import Profile from './Profile';
import '../assets/main.css';


class App extends Component {
  static propTypes = {
    auth: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <PrivateRoute path="/profile" component={Profile} isAuth={this.props.auth} />
          </Switch>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

export default connect(state => ({
  auth: state.auth.isAuth,
}), {
  getUser,
})(App);
