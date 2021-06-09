const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = 5000;

const mongoDBURI = require('./mongoDB-connection');

const documentRoutes = require('./server/routes/documentRoutes');

// ** SERVER AND DATABASE CONNECTION ** //
mongoose
	.connect(mongoDBURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('MongoDB Connected');

		// Start server as the DB connection is successful
		app.listen(PORT, error => {
			if (error) throw error;
			console.log(`Server listening at port ${PORT}`);
		});
	})
	.catch(error => console.log(error));

// ** MIDDLEWARES ** //
app.use('/viewDocument', express.static('uploadedDocuments'));
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ** ROUTES ** //
app.use('/document', documentRoutes);
