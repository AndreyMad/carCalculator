import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import AuthorizationForm from "./AuthorizationForm";
import AdminPanel from "./AdminPanel";
import * as API from "../../api/api";

class Admin extends Component {
  state = {
    isAuthorized: false,
    error: false,
    adminUser: "",
    users: {}
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthorized: true });
    }
  }

  adminAuthorization = (userName, password) => {
    const user = API.adminAuthorization(userName, password).then(
      // eslint-disable-next-line no-console
      res => {
        const { data } = res;

        if (data.err) {
          this.setState({ error: data.err });
          NotificationManager.error("Помилка", data.err);
          return;
        }
        if (!data.err && data.token) {
          localStorage.setItem("token", data.token);
          this.setState({
            error: false,
            isAuthorized: true,
            adminUser: data.user.name
          });
        }
      }
    );
    return user;
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ isAuthorized: false });
  };

  render() {
    const { isAuthorized, error, adminUser, users } = this.state;
    return (
      <>
        {isAuthorized && !error ? (
          <>
            <button type="button" onClick={this.logout}>
              Logout
            </button>
            <AdminPanel adminUser={adminUser} users={users} />
          </>
        ) : (
          <AuthorizationForm adminAuthorization={this.adminAuthorization} />
        )}
        <NotificationContainer />
      </>
    );
  }
}

export default Admin;
