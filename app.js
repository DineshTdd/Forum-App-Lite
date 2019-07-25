// for running this node server file
// npm run start:server
const path = require('path');
const express = require('express'); // npm install --save express
const bodyParser = require('body-parser'); // npm install --save body-parser used for parsing data from request from client


const DB= require('./Mconnection');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


const app = express(); //express app initialization


app.use(bodyParser.json()); //valid express middleware for parsing JSON data
app.use(bodyParser.urlencoded({extended: true})); //for url encoded data
app.use("/images",express.static(path.join(__dirname, '/images')));
app.use("/",express.static(path.join(__dirname, 'angular')));

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*"); // accepting all the requests from other servers
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // types of headers sent along with response
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT"); //methods used along with request - response
    next(); // enabling next "app." method
});


app.use(postsRoutes);
app.use(userRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

console.log("Hi from express app!");
 module.exports = app;
