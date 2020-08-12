/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import style from "./Admin.module.css";
import * as API from "../../api/api";

class AdminPanel extends Component {
  state = {
    users: []
  };

  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        allowedCarfaxRequest: PropTypes.string.isRequired,
        // name: PropTypes.shapeOf({
        //   firstName: PropTypes.string.isRequired,
        //   lastName: PropTypes.string.isRequired
        // }).isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
      })
    ).isRequired
  };

  componentDidMount() {
    const { users } = this.props;
    if (Object.keys(users).length > 1) {
      this.setState({ users: [...users] });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }
    const { users } = this.props;
    this.setState({ users });
  }

  componentWillUnmount() {
    API.deleteAdminSession(localStorage.getItem("token")).then(res => {
      if (res.data) {
        localStorage.removeItem("token");
      }
    });
  }

  inputChange = ({ target }) => {
    const { users } = this.state;
    const newUser = users.find(user => {
      return user._id === target.id;
    });
    newUser.allowedCarfaxRequest = target.value;
    users.splice(users.indexOf(newUser), 1, newUser);
    this.setState({ users });
  };

  inputSubmit = e => {
    e.preventDefault();
    const { users } = this.state;
    const newUser = users.find(user => {
      return user._id === e.target.id;
    });
    API.updateUser(newUser).then(res => {
      if (JSON.stringify(newUser) === JSON.stringify(res)) {
        return NotificationManager.success("Успішно", "Дані оновлено", 3000);
      }
      return NotificationManager.error("Помилка", "Дані не оновлено", 3000);
    });
  };

  render() {
    const { users } = this.state;

    return (
      <>
        <div className={style.container}>
          <NotificationContainer />
          {users.map(user => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={user._id} className={style.wrapper}>
              <div className={style.innerWrappe}>
                <p>Імя: {user.name.firstName}</p>
                <p>Прізвище: {user.name.lastName}</p>
              </div>
              <div className={style.innerWrappe}>
                <p>Email: {user.email}</p>
                <p>Телефон: {user.phone}</p>
              </div>
              <p>Кількість карфакс: </p>
              <form id={user._id} onSubmit={this.inputSubmit}>
                <input
                  type="number"
                  value={user.allowedCarfaxRequest}
                  id={user._id}
                  className={style.valueInput}
                  onChange={this.inputChange}
                />
                <input value="Submit" type="submit" />
              </form>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default AdminPanel;
