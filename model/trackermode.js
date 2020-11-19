'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackerschema = mongoose.Schema({

    email: String,
    speed: String,
    location: String,
    angle: String,
    datetime: String,

});

module.exports = mongoose.model('trackerdata', trackerschema);