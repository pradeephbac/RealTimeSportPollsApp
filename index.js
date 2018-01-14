var express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');

const fs = require('fs');

var path = require('path');
const http = require('http');
var bodyParser = require('body-parser');
const authentication = require('./routes/authentication')(router);
const events = require('./routes/events')(router);
const votes = require('./routes/votes')(router);

const server = http.createServer(app);
var io = require('socket.io').listen(server);

var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect to db', err);
    } else {
        console.log('connect to db', config.db);
    }
});

app.use(cors({
    origin: "http://localhost:4200"
}))


//set build directory of Angular2 -midelwares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authentication);
app.use('/events', events);
app.use('/vote', votes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});


app.listen(8080, () => {
    console.log('server starts at port 8080');
});


/**
 * Socket events
 */
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', function (msg) {
        console.log('message recieved');
        console.log(msg);
    });
});