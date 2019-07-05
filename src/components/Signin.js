import React, { Component } from "react";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    authLoading: false
  };

  emailInputChangeHandler = event => {
    this.setState({ email: event.target.value });
  };

  passwordInputChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  signInButtonClicked = event => {
    event.preventDefault();
    alert("email typed" + this.state.email);
  };

  loginHandler = event => {
    console.log("sign in is tapped");
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          //   isAuth: true,
          //   token: resData.token,
          //   userId: resData.userId,
          authLoading: false
        });
        this.props.onLoginComplete(true, resData.token, resData.userId);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 3 * 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        // this.setAutoLogout(remainingMilliseconds);
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
        <h1>sign in page</h1>
        <form onSubmit={this.loginHandler}>
          <input
            type="text"
            placeholder="enter your email id"
            onChange={this.emailInputChangeHandler}
            value={this.state.email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.passwordInputChangeHandler}
            value={this.state.password}
          />
          <input type="submit" value=" log in" />
        </form>
      </div>
    );
  }
}

export default Signin;
