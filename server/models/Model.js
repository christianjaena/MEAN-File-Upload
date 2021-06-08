const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const schema = new Schema({
	id: {
		type: Number,
		require: true,
	},
});

const SampleSchema = Model('SampleSchema', schema)
module.exports = SampleSchema;
