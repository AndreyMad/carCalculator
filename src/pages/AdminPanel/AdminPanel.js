/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Admin.module.css";

class AdminPanel extends Component {
  state = {
    users: []
  };

  static propTypes = {
    users: PropTypes.arrayOf().isRequired
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

  inputChange = ({ target }) => {
    const { users } = this.state;
    const newUser = users.find(user => {
      return user._id === target.id;
    });
    newUser.allowedCarfaxRequest = target.value;

    this.setState({ users: [...users, newUser] });
    return newUser;
  };

  render() {
    const { users } = this.state;

    return (
      <>
        <div className={style.container}>
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
              <input
                type="number"
                value={user.allowedCarfaxRequest}
                id={user._id}
                onChange={this.inputChange}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default AdminPanel;
