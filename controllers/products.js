const { db } = require('../dbConnection');

// const WishList = require("../models/wishList");

module.exports.showProducts = async (req, res) => {
  // const wishList = await WishList.findOne({ _id: id });
  // const products = await Product.find();

  const searchProducts = 'SELECT * FROM PRODUCTS';
  db.query(searchProducts, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
