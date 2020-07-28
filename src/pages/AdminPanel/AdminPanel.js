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
    users: PropTypes.shape.isRequired,
    adminUser: PropTypes.shape({}).isRequired
  };

  componentDidMount() {
    const { users, adminUser } = this.props;
    this.setState({ users, adminUser });
    const token = localStorage.getItem("token");
    if (token) {
      API.getUsers().then(res => {
        this.setState({ isAuthorized: true, users: [...res.data.users] });
      });
    }
  }

  render() {
    const { users, isAuthorized, adminUser } = this.state;

    return (
      <>
        {isAuthorized ? (
          <div className={style.container}>
            <p>{adminUser}</p>
            <p>{users}</p>
          </div>
        ) : null}
      </>
    );
  }
}

export default AdminPanel;
