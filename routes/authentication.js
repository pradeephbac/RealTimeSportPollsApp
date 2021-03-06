const User = require('../models/user');
const jwt =require('jsonwebtoken');
const config = require('../config/database');


module.exports = (router) => {
    router.post('/register', (req, res) => {
        if(!req.body.email){
            res.json({success : false, message: "E-mail Field is required...!"});
        }else{
            if(!req.body.username){
                res.json({success : false, message: "Username Field is required...!"});
            }else{
                if(!req.body.password){
                    res.json({success : false, message: "Password Field is required...!"});
                }else{
                    let user = new User({
                        username : req.body.username.toLowerCase(),
                        email : req.body.email.toLowerCase(),
                        password : req.body.password
                    }); 
                    user.save((err) => {  
                        if(err){
                            if(err.code === 11000){
                                res.json({success : false, message: "Username or Email already exsists"});
                            }else{
                                if(err.errors){
                                    if(err.errors.email){
                                        res.json({success : false, message: err.errors.email.message});                                       
                                    }else{
                                        if(err.errors.username){
                                            res.json({success : false, message: err.errors.username.message});                                       
                                        }else{
                                            if(err.errors.password){
                                                res.json({success : false, message: err.errors.password.message});                                       
                                            }else{
                                                res.json({success : false, message: err});                                       
                                            }
                                        }
                                    }
                                }else{
                                    res.json({success : false, message: "User Is Not Saved...!! Error : "+err});
                                } 
                            }    
                        } 
                        else {
                            res.json({success : true, message: "User Saved Successfully...!"});
                        }
                    }); 
                } 
            } 
        } 
    });

    router.post('/login', (req, res)=>{
        if(!req.body.username){
            res.json({success : false, message: "Username Field is Empty...!"});
        }else{
            if(!req.body.password){
                res.json({success : false, message: "Password Field is Empty...!"});
            }else{
                User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
                    if(err){
                        res.json({success : false, message: err}); 
                    }else{
                        if(!user){
                            res.json({success : false, message: "User not Found!"});                 
                        }else{
                            if(!user.comparePasswords(req.body.password)){
                                res.json({success : false, message: "Password is invalid...!"});
                            } else {
                                const token = jwt.sign({  userId: user._id }, config.secret, {expiresIn: '2h'});
                                res.json({success : true, message: "success", token:token, user: {username : user.username, id:user._id}});      
                            }
                        }
                    }
                })
            }
        }
    }); 

    return router;
}