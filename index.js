var express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
var path = require('path'); 
var bodyParser = require('body-parser');

//route paths
const authentication = require('./routes/authentication')(router);
const events = require('./routes/events')(router);
const votes = require('./routes/votes')(router);
const config = require('./config/database');

//socket io configuration
var server = require('http').createServer(app)
var io = require('socket.io')(server);

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

//Api routes
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
    //new socket user connected  
    socket.on('disconnect', function () {
        //socket user disconnected
    });

    //socket communication triggers when update - vote status reached
    socket.on('update-vote',function(message){ 
      io.emit('update-vote', "success" );
    })

});