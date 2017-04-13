"use strict";

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');
const port = 3000;
const config = require('config'); //we load the db location from the JSON files

    //db options for mongoose
    const options = { 
                    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
                }; 

    mongoose.connect(config.DBHost, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    //don't show the log when it is test |  NODE_ENV is node ENVIROMENT VARIABLE
    if(config.util.getEnv('NODE_ENV') !== 'test') {
        //use morgan to log at command line
        app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
    }  

    //parse application/json and look for raw text                                        
    app.use(bodyParser.json());                                     
    app.use(bodyParser.urlencoded({extended: true}));               
    app.use(bodyParser.text());                                    
    app.use(bodyParser.json({ type: 'application/json'}));  

    // Point static path to client
    app.use(express.static(path.join(__dirname, 'client/dist')));    

	// configure our app to handle CORS requests (request from any domain)
	 app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
		next();
	});

    //============ ROUTES =========

    // Set up ALL routes
    app.use('/api', routes);

    // Catch all other routes and return the index file from angular2
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });

    //============ error handling =========
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
    // set locals, only providing error in development
   // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message, status: err.status });
    });
    //============= start the server and export app ===


app.listen(port);
console.log("Listening on port " + port);

module.exports = app;   // export the server for testing purposes  
