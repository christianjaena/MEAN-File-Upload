const SampleSchema = require('../models/Model');

function getController(req, res) {}

function postController(req, res) {
	console.log(req.files);
	res.status(200);
}

module.exports = {
	getController,
	postController,
};
