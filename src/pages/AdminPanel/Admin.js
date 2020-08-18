import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import AuthorizationForm from "./AuthorizationForm";
import AdminPanel from "./AdminPanel";
import * as API from "../../api/api";
import style from "./Admin.module.css";

class Admin extends Component {
  state = {
    isAuthorized: false,
    error: false,
    adminUser: "",
    users: {}
  };

  componentDidMount() {
    this.authorizationCheck();
  }

  // доделать проверку на админа
  authorizationCheck = () => {
    const token = localStorage.getItem("token");
    // API.checkUserSession(token).then(res => {
    //   if (!res.data.resp) {
    //     this.setState({ isAuthorized: false });
    //   }
    //   if (res.data.resp && token === res.data.resp.sessionToken) {
    //     API.getUsers().then(resp => {
    //       this.setState({
    //         isAuthorized: true,
    //         users: resp.data.users,
    //         adminUser: res.data.resp.userName
    //       });
    //     });
    //   }
    // });
  };

  adminAuthorization = (userName, password) => {
    // API.adminAuthorization(userName, password)
    //   .then(res => {
    //     const { data } = res;
    //     if (data.err) {
    //       this.setState({ error: data.err });
    //       NotificationManager.error("Помилка", data.err);
    //       return;
    //     }
    //     if (!data.err && data.token) {
    //       localStorage.setItem("token", data.token);
    //       this.setState({
    //         error: false,
    //         isAuthorized: true,
    //         adminUser: data.user.name
    //       });
    //     }
    //   })
    //   .finally(() => this.authorizationCheck())
    //   // eslint-disable-next-line no-console
    //   .catch(err => console.log(err));
  };

  logout = () => {
    // API.deleteSession(localStorage.getItem("token"));
    // localStorage.removeItem("token");
    // this.setState({ isAuthorized: false, users: {} });
  };

  render() {
    const { isAuthorized, error, adminUser, users } = this.state;
    return (
      <>
        {isAuthorized && !error ? (
          <>
            <div className={style.logoutContainer}>
              {" "}
              <p>{adminUser}</p>
              <button
                className={style.logoutBtn}
                type="button"
                onClick={this.logout}
              >
                Logout
              </button>{" "}
            </div>

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
