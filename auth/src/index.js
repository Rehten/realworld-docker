var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = require('../configuration').port;
var connectDb = require('../helpers/db').connectDb;

const startServer = () => {
    app.listen(port, () => {
        console.log('Our auth server work correctly')
    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

app.get('/hello', (req, res) => {
    res.json({status: 'AUTH Microservice is working!!!'});
});
