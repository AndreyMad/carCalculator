import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthorizationForm extends Component {
  state = {
    userName: "",
    password: ""
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  render() {
    const { userName, password } = this.state;
    const { onSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={onSubmit.bind(this)}
          style={{
            width: "400px",
            height: "250px",
            backgroundColor: "lightGrey",
            margin: "100px auto",
            display: "flex",
            border: "solid 1px black",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={this.handleChange}
            placeholder="імя"
            style={{ width: "250px", height: "40px", margin: "0px auto 20px" }}
          />
          <input
            type="text"
            id="password"
            onChange={this.handleChange}
            value={password}
            placeholder="пароль"
            style={{ width: "250px", height: "40px", margin: "0px auto 20px" }}
          />
          <input
            type="submit"
            value="Submit"
            style={{ width: "200px", height: "40px" }}
          />
        </form>
      </div>
    );
  }
}

export default AuthorizationForm;
