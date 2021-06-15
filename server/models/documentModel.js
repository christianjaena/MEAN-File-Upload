const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const documentSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		dateDefended: {
			type: String,
			required: true,
		},
		college: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		filePath: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const DocumentModel = Model('Document', documentSchema);
module.exports = DocumentModel;
