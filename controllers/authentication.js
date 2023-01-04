/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { db } = require('../dbConnection');

module.exports.renderSignup = (req, res) => {
  res.render('./signup');
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (username && email && password) {
    const searchQuery = 'SELECT * FROM  USERS WHERE EMAIL = ?';
    const findUser = mysql.format(searchQuery, [email]);
    db.query(findUser, (err, rows, fields) => {
      if (!err) {
        if (rows.length === 0) {
          const insertQuery = 'INSERT INTO USERS VALUES (0,?,?,?)';
          const insertUser = mysql.format(insertQuery, [
            username,
            email,
            hashedPassword,
          ]);
          db.query(insertUser, (err1, rows1, fields1) => {
            if (!err1) {
              res.json({ message: 'User created' });
            } else {
              console.log(err1);
            }
          });
        } else {
          res.json({ message: 'User already exists' });
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.json({ messaage: 'Email or Password or Username is missing' });
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('./login');
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const searchQuery = 'SELECT * FROM USERS WHERE EMAIL = ?';
    const searchUser = mysql.format(searchQuery, [email]);
    db.query(searchUser, async (err, rows, fields) => {
      if (rows.length === 1) {
        const result = await bcrypt.compare(password, rows[0].password);
        if (result) {
          const { userId } = rows[0];
          const token = await jwt.sign({ userId }, process.env.HASH_KEY, {
            expiresIn: '7d',
          });
          res.cookie('token', token, {
            httpOnly: true,
          });
          res.json({ message: 'Successfully Logged in' });
        } else {
          res.json({ message: 'Email/Password is incorrect' });
        }
      } else {
        res.json({ message: 'The user is not registered' });
      }
    });
  } else {
    res.json({ message: 'Email or Password is empty.' });
  }
};
