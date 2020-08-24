var express = require('express');
var app = express();
var port = require('../configuration').port;

app.get('/hello', (req, res) => {
    res.json({status: 'AUTH Microservice is working!!!'});
});

app.listen(port, () => {
    console.log('Our auth server work correctly')
});
