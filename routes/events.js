const Event = require('../models/event');
const VoteHistory = require('../models/voteHistory');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

var async = require('async');
const path = require('path')
// Request File System Module
const fs = require('fs');

module.exports = (router) => {

    async function readEventsFromExternalFile(callback) {
        let reqPath = path.join(__dirname, '../mock/events.json'); //relative  path to document
        fs.readFile(reqPath, 'utf8', function (err, eventData) {
            //Handle Error
            if (!err) {
                // Parse eventData to JSON OR
                let eventArray = JSON.parse(eventData);
                callback(null, eventArray);
            } else {

            }
        });
    }

    async function getrealtimeDocumentCount(callback, eventArray) {
        let eventCount = await Event.collection.find().count();
        callback(null, eventCount, eventArray);
    }

    async function bulkUpdateEventsDocument(callback, eventCount, eventArray) {
        let message = {};
        if (eventCount < eventArray.length) {
            Event.collection.insertMany(eventArray, {
                ordered: false
            }, onInsert);

            function onInsert(err, events) {
                if (err) {
                    message = {
                        success: false,
                        message: " Error occured :" + err
                    };
                    callback(null, message);
                } else {
                    message = {
                        success: true,
                        message: "Events Saved Successfully...!"
                    };
                    callback(null, message);
                }
            }
        } else {
            message = {
                success: false,
                message: "Events are added already...!"
            };
            callback(null, message);
        }
    }

    async function getAllEvents() {
        let events = await Event.collection.findAll({});
        return events;
    }

    router.get('/readEvents', function (req, res) {
        async.waterfall([
            function (callback) {
                readEventsFromExternalFile(callback);
            },
            function (eventArray, callback) {
                getrealtimeDocumentCount(callback, eventArray);
            },
            function (eventCount, eventArray, callback) {
                bulkUpdateEventsDocument(callback, eventCount, eventArray);
            }
        ], function (err, resultMessage) {
            res.json(resultMessage);
        });
    });

    router.get('/allEvents', function (req, res) {
        Event.find({}, function (err, events) {
            if (err) {
                res.json({
                    success: false,
                    message: " Error occured :" + err
                });
            } else {
                res.json({
                    success: true,
                    events: events
                });
            }

        });

    });

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


    async function getVoteHistoryItems(callback, req) {
        let userId = req.decoded.user_id;
        let eventCount = await Event.collection.find().count();
        VoteHistory.find({
            user_id: userId
        }, function (err, previousVoteArray) {
            callback(null, previousVoteArray);
        });
    }

    async function remainEventArray(callback, previousVoteArray) {
        let remainEvents = [];
        let Events = await Event.collection.find();
        _.each(Events, function (event) {
            _.each(previousVoteArray, function (historyItem) {
                if (event._id != historyItem.event_id) {
                    remainEvents.push(event)
                }
            });
        }); //get the array difference
        callback(null, remainEvents);
    }


    router.get('/allRemainEventsForUser', function (req, res) {
        async.waterfall([
            function (callback) {
                getVoteHistoryItems(callback, req);
            },
            function (previousVoteArray, callback) {
                remainEventArray(callback, remainEvents, previousVoteArray);
            }
        ], function (err, remainEvents, previousVoteArray) {
            res.json({
                success: true,
                message: "Got All Remain Events  Successfully...!",
                events: remainEvents
            });
        });


    });

    return router;
}