import React, { Component } from "react";
import AuthorizationForm from "./AuthorizationForm";
import AdminPanel from "./AdminPanel";

class Admin extends Component {
  state = {
    isAuthorized: false
  };

  render() {
    const { isAuthorized } = this.state;
    return <> {!isAuthorized ? <AuthorizationForm /> : <AdminPanel />}</>;
  }
}

export default Admin;
