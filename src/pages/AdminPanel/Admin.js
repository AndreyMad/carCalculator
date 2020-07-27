import React, { Component } from "react";
import AuthorizationForm from "./AuthorizationForm";
import AdminPanel from "./AdminPanel";
import * as API from "../../api/api";

class Admin extends Component {
  state = {
    isAuthorized: false
  };

  onSubmit(e) {
    e.preventDefault();
    const { userName, password } = this.state;

    const user = API.adminAuthorization(userName, password).then(
      // eslint-disable-next-line no-console
      res => console.log(res.data)
      // this.setState({ userName: "", password: "" })
    );
    return user;
  }

  render() {
    const { isAuthorized } = this.state;
    return (
      <>
        {!isAuthorized ? (
          <AuthorizationForm onSubmit={this.onSubmit} />
        ) : (
          <AdminPanel />
        )}
      </>
    );
  }
}

export default Admin;
