import React, { Component } from "react";
import AuthorizationForm from "./AuthorizationForm.jsx";
import AdminPanel from "./AdminPanel.jsx";

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
