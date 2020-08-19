/* eslint-disable no-console */
const { Client } = require("pg");
const jwt = require("jsonwebtoken");

const client = new Client({
  host: "dumbo.db.elephantsql.com",
  port: 5432,
  user: "xjqyfann",
  password: "MjJJt1VnysEEFCqb_oSLEqh6EINXDBMT"
});
client.connect(err => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  return console.log("postgree connected");
});
// done
const addUser = ({ firstName, lastName, email, phone, password }) => {
  return client
    .query(
      `INSERT INTO users(firstname, lastName,email, phone, password ) VALUES($1, $2, $3, $4, $5) returning id, email, password`,
      [firstName, lastName, email, phone, password]
    )
    .then(res => {
      return { user: { ...res.rows[0] } };
    })
    .catch(error => {
      return { error: { ...error }, user: {} };
    });
};
// DONE
const setTokenToDb = (userEmail, token) => {
  client
    .query(
      "INSERT INTO sessions(userEmail, token) VALUES($1, $2) RETURNING *",
      [userEmail, token]
    )
    .then(res => res.rows)
    .catch(err => {
      return err;
    });
};

const deleteTokenFromDb = token => {
  client
    .query("DELETE FROM sessions (token) VALUES($1) RETURNING token", [token])
    .then(res => {
      console.log(res);
      return res.rows;
    })
    .catch(err => {
      return err;
    });
};

// DONE
const authorization = ({ userEmail, password }) => {
  return client
    .query(`SELECT * FROM users where email = '${userEmail}'`)
    .then(res => {
      if (res.rows.length === 0) {
        return { error: "Користувача не знайдено", user: {} };
      }

      if (res.rows[0].password === password) {
        const token = jwt.sign(res.rows[0].password, "crazy_cat");

        setTokenToDb(userEmail, token);
        return { user: { ...res.rows[0] }, token };
      }
      return null;
    })
    .catch(error => {
      return { error: { ...error }, user: {} };
    });
};

module.exports.addUser = addUser;
module.exports.authorization = authorization;
module.exports.deleteTokenFromDb = deleteTokenFromDb;
