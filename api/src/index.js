var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = require('../configuration').port;
var connectDb = require('../helpers/db').connectDb;

const startServer = () => {
    app.listen(port, () => {
        console.log('Our api server work correctly')
    });

    const kittySchema = new mongoose.Schema({
        name: String
    });

    const Kitten = mongoose.model('Kitten', kittySchema);

    const newKitten = new Kitten({name: 'Habibasta'});

    newKitten.save(() => {
        Kitten.find((err, kittens) => {
            console.log('FIND ALL KITTEN', kittens);
        });
    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

app.get('/hello', (req, res) => {
    res.json({status: 'API Microservice is working'});
});
