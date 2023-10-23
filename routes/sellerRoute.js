const express = require('express');

const seller_route = express();

const User = require('../models/UserModel');

const user_controller = require('../controllers/UserController');

seller_route.post('/create-catalog', user_controller.create_catalog);

seller_route.get('/orders', user_controller.list_orders);

module.exports = seller_route;