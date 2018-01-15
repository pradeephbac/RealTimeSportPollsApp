## RealTime Sports Polls Application - 2018

## Software

Cross browser compatible web application for sports polls.

    Node  8.2.1 (2018-02-18)
    Express 4.16.2 --version 1.6.2
    Mongoose  Ver 5.0.0-rc2 
    Angular 2.0.0

## How to install Polls Application

### Requirements

 - node 8
 - mongodb
 - Angular2
 
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
- go to your favorite browser and type 'http://localhost:8080'
- Test your polls app 



## UserModel

    {
        username : ''
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

* Testing
