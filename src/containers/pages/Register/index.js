import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeText = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;

    const res = await this.props
      .registerAPI({ email, password })
      .catch(err => err);

    if (res) {
      this.setState({
        email: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input
            className="input"
            placeholder="Email"
            type="email"
            id="email"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            id="password"
            onChange={this.handleChangeText}
            value={this.state.password}
          />
          <Button
            onClick={this.handleRegisterSubmit}
            title="Register"
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const reduxState = state => ({ isLoading: state.isLoading });

const reduxDispatch = dispatch => {
  return { registerAPI: data => dispatch(registerUserAPI(data)) };
};

export default connect(
  reduxState,
  reduxDispatch
)(Register);
