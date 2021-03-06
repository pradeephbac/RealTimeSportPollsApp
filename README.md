## RealTime Sports Polls Application - 2018

### Description

This applicaiton is build to use as a realtime poolling system for provintial sports in Sri Lanka.
SportsEvents.json file contains events which are supose to happen during next six months. Audiance can register as an ordinary user and login with his/her credentials to the system.

One person only can vote for any given polls for single time only.All the autherizations and authentications will handle by the system and finally you can view overall results with voted users at results page.

## Software

Cross browser compatible web application for sports polls.

    Node  8.2.1 (2018-02-18)
    Express 4.16.2 --version 1.6.2
    Mongoose  Ver 5.0.0-rc2 
    Angular 2.0.0
    Socket.io 2.0.4 (latest)

## How to install Polls Application

### Requirements

 - node 8
 - mongodb
 - Angular2
 - Socket.io
 
### Installation Steps

- Fork the repo PollsApplication
- Get a clone from your fork
- Make sure you have mongodb setup if not refer Polls Application readme
- Checkout master branch
- Create config/database.js file that refer your MongoDB credentials 
- npm install at root level to install dependancies for back end.
- cd ./client and npm install to install angular2 (front end) dependancies 
- Open mongodb bin folder from command prompt (Download mongoDB to your localfolder and open cmd)
	- type -> mongod
	- your mongo db instance will start with port 27017
- Type command 'nodemon index.js' or 'node index.js'
- go to your favorite browser and type 'http://localhost:8080'
- Enjoy your polls app 


## UserModel

    {
        username : '',
        email : '',
        password: ''
    }

## EventModel

    {
        awayName: '',
        group: '',
        homeName: '',
        name: '',
        sport:'',
        province: '',
        vote: [ {user_id : '', result: ''}]
    }


## Unit Testing
    - cd ./client (Angular2 directory)
    - Type command 'npm test' or 'ng test'
    - see the unit test results in chrome browser and terminal

## e2e Testing
    - cd ./client (Angular2 directory)
    - Type command 'npm e2e' or 'ng e2e'
    - see the browser emulation and results
