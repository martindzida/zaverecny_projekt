import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: true,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    axios
      .post(
        "https://25.69.166.33:8000/dj-rest-auth/login/",
        { email: this.state.email, password: this.state.password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  badLogin() {
    if (this.state.loginError === true) {
      return (
        <div className="col-12">
          <span className="badge badge-pill badge-danger m-1">!</span>
          <small className="text-danger font-weight-bold">
            Wrong password or email.
          </small>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row center p-3 m-4">
        <div className="col-12">
          <div className="m-4">
            <h2>Login</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="m-3">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label className="m-3">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
              <div className="row">{this.badLogin()}</div>
            </div>
            <button type="submit" className="btn btn-outline-dark btn-warning">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
