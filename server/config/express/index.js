const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        path = require('path'),
        dotenv = require('dotenv').config(),
        services = require('../../services');

app.disable("x-powered-by");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',express.static(path.join(__dirname, '../../public')));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     next();
// });

app.use('/api/',services);

module.exports = app;