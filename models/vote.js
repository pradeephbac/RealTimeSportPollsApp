const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

 

const voteSchema = new Schema({
    user_id: {
        type: String,
        required: true 
    },
    event_id: {
        type: String,
        required: true 
    },
    homeWins: {
        type: Boolean, 
        required: true 
    },
    awayWins: {
        type: Boolean,
        required: true 
    },
    draw: {
        type: Boolean,
        required: true 
    }
     
});

module.exports = mongoose.model('Vote', voteSchema); 