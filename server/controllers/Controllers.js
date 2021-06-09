const Document = require('../models/Document')

function getController(req, res) {
	Document.find()
		.then(result => res.status(200).json(result))
		.catch(err => res.status(400).json(err.message));
}

function postController(req, res) {
	const { author, title, date } = req.body;
	const { file } = req.files;

	const newDocumentModel = {
		author,
		title,
		date,
		filePath: `http://localhost:5000/files/${file.name.trim()}`,
	};

	const newDocument = new Document(newDocumentModel);
	newDocument
		.save()
		.then(result => {
			try {
				file.mv(`./uploads/${file.name}`);
				res.status(200).json(result);
			} catch (err) {
				console.log(err.message);
			}
		})
		.catch(err => {
			res.status(400).json(err);
		});
}

module.exports = {
	getController,
	postController,
};
