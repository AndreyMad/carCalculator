import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Admin.module.css";
import * as API from "../../api/api";

class AdminPanel extends Component {
  state = {
    isAuthorized: false,
    users: []
  };

  static propTypes = {
    adminUser: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { adminUser } = this.props;
    this.setState({ adminUser });
    const token = localStorage.getItem("token");
    if (token) {
      API.getUsers().then(res => {
        this.setState({ isAuthorized: true, users: res.data.users });
      });
    }
  }

  render() {
    const { users, isAuthorized, adminUser } = this.state;
    console.log(users);

    return (
      <>
        <div className={style.container}>
          {users &&
            users.map(user => (
              // eslint-disable-next-line no-underscore-dangle
              <div key={user._id} className={style.wrapper}>
                <p>Імя: {user.name.firstName}</p>
                <p>Прізвище: {user.name.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Кількість карфакс: {user.allowedCarfaxRequest}</p>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default AdminPanel;
