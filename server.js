const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');
const categoryRouter = require('./routes/category');


// Creating an Express application

const app = express();

// Setting the port number for the server

const port = 3000;

// Loading environment variables from a .env file

dotenv.config();

// Initializing the Firebase Admin SDK

const admin = require('firebase-admin');
const serviceAccount = require('./servicesAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Connecting to MongoDB using Mongoose

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection Successful!'))
    .catch((err) => {
        console.log("Error in DB Connection: " + err);
    });

// Adding middleware to parse JSON and URL-encoded request bodies

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handling requests to the root endpoint

app.use('/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/categories', categoryRouter);


// Starting the Express server on the specified port or a default port

app.listen(process.env.PORT || port, () => console.log(`Backend server listening on port ${process.env.PORT || port}!`));
