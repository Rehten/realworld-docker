var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = require('../configuration').port;
var authApiUrl = require('../configuration').authApiUrl;
var axios = require('axios');
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

app.get('/test-with-current-user', (req, res) => {
    axios.get(authApiUrl + '/current-user').then((response) => {
        console.log(response.data);
        res.json({
            user: response.data,
            isUserAuthenticated: true,
        });
    });
});
