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
    province: {
        type: String,
        required: true 
    },
    votes :[voteSchema]

});

module.exports = mongoose.model('SportEvent', eventSchema); 