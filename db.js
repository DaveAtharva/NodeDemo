// This FIle is responsible for the connection with MONGODB
const mongoose = require('mongoose');
require('dotenv').config(); 

const mongodburl = 'mongodb://0.0.0.0:27017/Demo'; //(Demo)-> Name of Database
// const mongodburl = 'mongodb+srv://Demo:12345@cluster0.0gqnihh.mongodb.net/';

// Estalishing Connection
mongoose.connect(mongodburl);

// This Object is used to make connection between Node And MongoDB
const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to MongoDB");
});

db.on('error', (err) => {
  console.log("Connection error MongoDB : ", err);
});

db.on('disconnected', () => {
  console.log("Disconnected from MongoDB");
});

// console.log('end');
module.export=db;