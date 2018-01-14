const Vote = require('../models/vote');
const Event = require('../models/event');
const VoteHistory = require('../models/voteHistory');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

var async = require('async');

module.exports = (router) => {


    async function saveNewVote(callback, req) { 
        let vote = new Vote({
            event_id: req.body.event_id,
            user_id: req.body.user_id,
            awayWins: req.body.awayWins,
            homeWins: req.body.homeWins,
            draw: req.body.draw
        });
        vote.save((err, vote) => {
            let voteMessage = {};
            if (err) {
                voteMessage = {
                    success: false,
                    message: "Vote Not Completed due to Error :" + err
                };
            } else {
                voteMessage = {
                    success: false,
                    message: "Vote Saved Successfully"
                };

                callback(null, voteMessage, vote);
            }
        });


    }

    async function updateVoteHistory(callback, voteMessage, vote) {

        let historyMessage = {};
        let voteHistory = new VoteHistory({
            user_id: vote.user_id,
            vote_id: vote._id
        });

        voteHistory.save((err, historyItem) => {
            if (!err) {
                historyMessage = {
                    success: true,
                    message: "Vote Saved Successfully...!"
                };
                callback(null, voteMessage, vote, historyMessage, historyItem);
            } else {
                historyMessage = {
                    success: false,
                    message: "ERRR Saved Successfully...!" + err
                };
            }
        });
    }

    router.post('/insertVote', (req, res) => {
        async.waterfall([
            function (callback) {
                saveNewVote(callback, req);
            },
            function (voteMessage, vote, callback) {
                updateVoteHistory(callback, voteMessage, vote);
            }
        ], function (err, voteMessage, vote, historyMessage, historyItem) {
            res.json(historyMessage);
        });
    });


    //header interceptor
    router.use((req, res, next) => {  
        const token = req.headers['autherization'];
        if (!token) {
            res.json({
                success: false,
                message: " No Access Token Provided"
            });
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: " Token Invalid: " + err
                    });
                } else { 
                    req.decoded = decoded;
                    next();
                }
            })
        }
    });
 
    router.post('/updateVoteResults', (req, res) => { 
        const voteItem =req.body.result; 
        Event.update(
            { _id: req.body.event_id }, 
            {
                "$addToSet": {
                  "votes":  voteItem
                }
              },
             function (err, updatedEvent) {
                if (err) {
                    res.json({
                        success: false,
                        message: " Error occured :" + err
                    });
                } else {
                    res.json({
                        success: true,
                        evenupdatedEventts: updatedEvent
                    });
                } 
            }
         ) 
    });

    return router;
}