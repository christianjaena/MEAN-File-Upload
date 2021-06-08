const SampleSchema = require('../models/Model');

function getController(req, res) {}

function postController(req, res) {
	const { file } = req.files;
	try {
		file.mv(`./uploads/${file.name}`);
		res
			.status(200)
			.json({ imagePath: `http://localhost:5000/files/${file.name.trim()}` });
	} catch (err) {
		console.log(err.message);
	}
}

module.exports = {
	getController,
	postController,
};
