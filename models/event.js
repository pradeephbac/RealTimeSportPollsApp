const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const voteSchema = new Schema({
    user_id: {type:String},
    result: {type:String}
});

const eventSchema = new Schema({
    awayName: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now 
    },
    group: {
        type: String,
        required: true 
    },
    homeName: {
        type: String,
        required: true 
    },
    name: {
        type: String,
        required: true 
    },
    sport: {
        type: String,
        required: true 
    },
    country: {
        type: String,
        required: true 
    },
    state: {
        type: String,
        required: true 
    },
    votes :[voteSchema]

});

module.exports = mongoose.model('Event', eventSchema); 