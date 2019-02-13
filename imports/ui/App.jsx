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
import CaptureImage from './pages/CaptureImage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Question from './pages/dashboard/Question.jsx';
import MainIntro from './pages/MainIntro.jsx';
import Ask from './pages/Ask.jsx';
import Winner from './pages/Winner.jsx';
import TimeOut from './pages/TimeOut.jsx';
import WrongAnswer from './pages/WrongAnswer.jsx';
import Screen from './pages/Screen.jsx'

class App extends React.PureComponent {
  constructor(props) {
    super(props);

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
    console.log(Meteor.userId());
    return (
      <Switch>
        <Route exact path="/"
          render={() => {
            this.onEnterPublicPage();
            return <Login history={this.props.history} />;
          }}
        />
        <Route path="/signup"
          render={() => {
            this.onEnterPublicPage();
            return <Register history={this.props.history} />;
          }}
        />
        <Route path="/add_quiz"
          render={() => {
            this.onEnterPrivatePage();
            return <Login />;
          }}
        />
        <Route path="/selfie"
          render={() => {
            this.onEnterPrivatePage();
            return <CaptureImage history={this.props.history} />;
          }}
        />
        <Route path="/intro"
          render={() => {
            this.onEnterPrivatePage();
            return <MainIntro history={this.props.history} />;
          }}
        />
        <Route path="/ask"
          render={() => {
            this.onEnterPrivatePage();
            return <Ask history={this.props.history} />;
          }}
        />
        <Route exact path="/winner"
          render={() => {
            this.onEnterPrivatePage();
            return <Winner history={this.props.history} />;
          }}
        />
        <Route exact path="/timeout"
          render={() => {
            this.onEnterPrivatePage();
            return <TimeOut history={this.props.history} />;
          }}
        />
        <Route exact path="/wronganswer"
          render={() => {
            this.onEnterPrivatePage();
            return <WrongAnswer history={this.props.history} />;
          }}
        />
        <Route exact path="/screen"
          render={() => {
            return <Screen history={this.props.history} />;
          }}
        />
        <Route path="/dashboard"
          render={() => {
            this.onEnterPrivatePage();
            return <Dashboard history={this.props.history} />;
          }}
        />
        <Route path="/question"
          render={() => {
            this.onEnterPrivatePage();
            return <Question history={this.props.history} />;
          }}
        />
        <Route exact path="/logout"
          render={() => {
            // this.onEnterPrivatePage();
            Meteor.logout(() => {this.props.history.replace('/signup')});
            return <h5>LogingOut...</h5>;
          }}
        />
      </Switch>
    );
  }
}


export default withRouter(App);
