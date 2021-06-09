const express = require('express');
const route = express.Router();

const {
	getController,
	postController,
} = require('../controllers/documentControllers');

route.get('/', getController);

route.post('/', postController);


module.exports = route;
