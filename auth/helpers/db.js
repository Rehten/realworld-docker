const mongoose = require('mongoose');
const db = require('./../configuration/index').db;

module.exports.connectDb = () => {
    mongoose.connect(db, {useNewUrlParser: true});

    return mongoose.connection;
};
