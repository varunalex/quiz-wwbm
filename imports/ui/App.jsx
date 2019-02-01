import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history);

    // binds
    this.onEnterPublicPage = this.onEnterPublicPage.bind(this);
    this.onEnterPrivatePage = this.onEnterPrivatePage.bind(this);

  }

  // Def - Rederect user to dashboard when try to visit unAuthenticated Pages
  onEnterPublicPage() {
    if (Meteor.userId()) {
      this.props.history.replace('/home');
    }
  }
  // Def - Redirect User to login when try to visit Authenticated Pages
  onEnterPrivatePage() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={() => {
            this.onEnterPublicPage();
            return <Login />;
          }}
        />
        <Route path="/signup"
          render={() => {
            this.onEnterPublicPage();
            return <Register />;
          }}
        />
        <Route path="/add_quiz"
          render={() => {
            this.onEnterPrivatePage();
            return <Login />;
          }}
        />
      </Switch>
    );
  }
}


export default withRouter(App);
