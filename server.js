const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoDBURI = require('./mongoDB-connection');

const Routes = require('./server/routes/Routes.js')

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

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ** ROUTES ** //
app.use('/api', Routes);
