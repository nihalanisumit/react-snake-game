import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import SnakeGame from "./components/SnakeGame";
import Layout from "./components/Layout/Layout";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    this.setState({ isAuth: false, token: null, userId: null });
    // this.props.history.replace("/signin");
  };

  onLoginComplete = (isAuth, token, userId) => {
    console.log(
      "onlog in complete method called, isAuth = " +
        isAuth +
        " token =" +
        token +
        " userid =" +
        userId
    );
    this.setState({
      isAuth: isAuth,
      token: token,
      userId: userId
    });
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route
          path="/signin"
          render={() => <Signin onLoginComplete={this.onLoginComplete} />}
        />
        <Route path="/" exact component={SnakeGame} />
      </Switch>
    );
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route path="/" component={SnakeGame} />
          />
        </Switch>
      );
    }
    return (
      <Layout isAuth={this.state.isAuth} logout={this.logoutHandler}>
        {routes}
      </Layout>
    );
  }
}

export default App;
