const Event = require('../models/event');
const VoteHistory = require('../models/voteHistory');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

var async = require('async');
const path = require('path')
var _ = require('underscore');
// Request File System Module
const fs = require('fs');

module.exports = (router) => {

    async function readEventsFromExternalFile(callback) {
        let reqPath = path.join(__dirname, '../mock/sportEvents.json'); //relative  path to document
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
                        message: " Error occured :" + err,
                        status: 500
                    };
                    callback(null, message);
                } else {
                    message = {
                        success: true,
                        message: "Events Saved Successfully...!",
                        status: 200
                    };
                    callback(null, message);
                }
            }
        } else {
            message = {
                success: false,
                message: "Events are added already...!",
                status: 200
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

    //header interceptor below from this code line
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

    router.get('/allRemainEventsForUser', function (req, res) {
        Event.find({}, function (err, events) {
            if (err) {
                res.json({
                    success: false,
                    message: " Error occured :" + err
                });
            } else {
                res.json({
                    success: true,
                    message: "Remain Events For User",
                    events: events
                });
            }

        });
    });

    function getAggrigatedResults(events) {
        const aggrigateEvents = [];
        _.each(events, function (event) {
            const aggrigateEvent = {
                _id: event._id,
                awayName: event.awayName,
                homeName: event.homeName,
                group: event.group,
                sport: event.sport,
                province: event.province
            };

            if (event.votes.length > 0) {
                let result = _.countBy(event.votes, "result");
                aggrigateEvent.results = result;
            } else {
                aggrigateEvent.results = {};
            }
            aggrigateEvents.push(aggrigateEvent)
        });
        return aggrigateEvents;
    }

    router.get('/allEventResults', function (req, res) {
        Event.find({}, function (err, events) {
            if (err) {
                res.json({
                    success: false,
                    message: " Error occured :" + err
                });
            } else {
                res.json({
                    success: true,
                    massege: "retun aggrigated results",
                    results: getAggrigatedResults(events)
                });
            }
        });
    });

    return router;
}