'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


const app = express();

// Initialize MongoDB Memory Server
async function connectToMongoDB() {
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    await mongoose.connect(mongoUri);
}

app.use(express.json());

// Connect to the MongoDB in-memory server
connectToMongoDB().then(() => {
    console.log('Connected to MongoDB in-memory server');
}).catch((error) => {
    console.error('Error connecting to MongoDB in-memory server:', error);
    process.exit(1);
});


// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/comments', require('./routes/comments'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/profile'));

module.exports = app;

// start server
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log('Express started. Listening on port %s', port);
    });
};

