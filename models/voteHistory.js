const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');



const voteHistorySchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    vote_id: {
        type: String,
        required: true
    }



});

module.exports = mongoose.model('VoteHistory', voteHistorySchema);