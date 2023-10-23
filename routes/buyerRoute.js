const express = require('express');

const buyer_route = express();

const User = require('../models/UserModel');

const user_controller = require('../controllers/UserController');

buyer_route.get('/list-of-sellers', user_controller.get_sellers_list);

buyer_route.get('/seller-catalog/:seller_id', user_controller.get_catalog);

buyer_route.post('/create-order/:seller_id', user_controller.create_order);

module.exports = buyer_route;