const express = require('express');

const app = express();

const cors = require('cors');

const cookieParser = require('cookie-parser');

const body_parser = require('body-parser');

const {loggedInAreaBuyer, loggedInAreaSeller} = require('./middlewares/auth')

app.use(body_parser.json());

app.use(cors({
  origin:"*"
}));

const mongoose = require('mongoose');

try{
  mongoose.connect("mongodb://0.0.0.0:27017/mern");
}catch(error){
  console.log(error);
}

const user_route = require('./routes/userRoute');

const seller_route = require('./routes/sellerRoute');
const buyer_route = require('./routes/buyerRoute');

app.use(cookieParser());
app.use('/api', user_route);
app.use('/api/seller', loggedInAreaSeller,seller_route);
app.use('/api/buyer', loggedInAreaBuyer, buyer_route)

app.listen(8000);