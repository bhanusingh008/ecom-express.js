const express = require('express');


const user_route = express();

const body_parser = require('body-parser');

// for requesting the body in json

user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({extended : true}));

const user_controller = require('../controllers/UserController');

const auth_controller = require('../controllers/AuthController');

user_route.post('/auth/register', auth_controller.registerUser);

user_route.post('/auth/login', auth_controller.auth_user);

module.exports = user_route;