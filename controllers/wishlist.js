const mysql = require('mysql');
const { db } = require('../dbConnection');

module.exports.showWishlist = async (req, res) => {
  const { userId } = req;
  const searchQuery = 'SELECT * FROM WISHLIST WHERE USERID = ?';
  const searchWishlist = mysql.format(searchQuery, [userId]);
  db.query(searchWishlist, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports.addWishlist = async (req, res) => {
  const productId = req.body.name;
  const { userId } = req;
  if (productId && userId) {
    const selectQuery = 'SELECT * FROM PRODUCTS WHERE PRODUCTID  ?';
    const selectProduct = mysql.format(selectQuery, [productId]);
    db.query(selectProduct, (err, rows, fields) => {
      if (rows === 1) {
        const insertQuery = 'INSERT INTO WISHLIST VALUES (?,?)';
        const insertUser = mysql.format(insertQuery, [userId, productId]);
        db.query(insertUser, (err1, rows1, fields1) => {
          if (!err1) {
            res.json({ message: 'Added to wishlist' });
          } else {
            console.log(err1);
          }
        });
      }
    });
  } else {
    res.json({ message: 'productId or UserId missing' });
  }
};
