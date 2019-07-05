import React, { Component } from "react";

class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    authLoading: false
  };

  emailInputChangeHandler = event => {
    this.setState({ email: event.target.value });
  };

  nameInputChangeHandler = event => {
    this.setState({ name: event.target.value });
  };
  passwordInputChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  signupHandler = event => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace("/signin");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  render() {
    return (
      <div>
        <h1>sign up page</h1>
        <form onSubmit={this.signupHandler}>
          <input
            type="text"
            placeholder="enter your email id"
            onChange={this.emailInputChangeHandler}
            value={this.state.email}
          />
          <input
            type="text"
            placeholder="enter your name"
            onChange={this.nameInputChangeHandler}
            value={this.state.name}
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.passwordInputChangeHandler}
            value={this.state.password}
          />
          <input type="submit" value=" Sign up" />
        </form>
      </div>
    );
  }
}

export default Signup;
