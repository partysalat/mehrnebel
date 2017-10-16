import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import Routes from './router';
// import { authUser, signOutUser } from "./libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: false,
    };
  }


  handleLogout = () => {
    // signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
