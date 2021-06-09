const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const documentSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true,
	},
	filePath: {
		type: String,
		required: true,
	},
});

const DocumentModel = Model('Document', documentSchema);
module.exports = DocumentModel;
