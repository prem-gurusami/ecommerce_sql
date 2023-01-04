const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const loginRoutes = require('./routes/authenticationRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const { db} = require('./dbConnection');

db.connect((err)=>{
  if(err) throw err;
  console.log("mysql connected");

});

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', loginRoutes);
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes);

// app.post("/deleteWishList/:id",async (req,res)=>{
//     const userId=req.params.id;
//     const product=req.body.name;

//     let wishlist = await WishList.findOne({_id:userId});

//     wishlist.products.pop({"product":product});
//         await wishlist.save();

//     // const removeProduct = req.body.name;
//     // console.log(req.body.name);
//     // for(let i=0;i<wishList.length;i++){
//     //     if(wishList[i] == removeProduct){
//     //         wishList.splice(i, 1);
//     //         break;
//     //     }
//     // }
//     res.redirect("./wishlist/"+userId);
// });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
