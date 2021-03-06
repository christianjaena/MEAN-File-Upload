const DocumentModel = require('../models/documentModel');
const fs = require('fs');

function getController(req, res) {
	DocumentModel.find()
		.sort({ createdAt: -1 })
		.then(result => res.status(200).json(result))
		.catch(err => res.status(400).json(err.message));
}

function postController(req, res) {
	const { author, title, dateDefended, college, department } = req.body;
	const { file } = req.files;

	const newDocumentModel = {
		author,
		title,
		college,
		department,
		dateDefended,
		filePath: `http://localhost:5000/viewDocument/${file.name}`,
	};

	const newDocument = new DocumentModel(newDocumentModel);
	newDocument
		.save()
		.then(result => {
			try {
				!fs.existsSync('./uploadedDocuments') &&
					fs.mkdirSync('./uploadedDocuments');
				file.mv(`./uploadedDocuments/${file.name}`);
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
