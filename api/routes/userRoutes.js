const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:"/uploads/"})
const userDetails = require('../models/userDetailsModel');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
// -----------------------To check server is running or not----------------------------------------------
router.get('/', (req, res, next) => {
    userDetails.find()
        .populate('userCategory')       
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json({
               userDetails : docs
            });
        })
        .catch(err=>{
            console.log(err);
            res.status().json({
                error:err
            });
        });
});
// --------------------------code to get user details By Id----------------------------------------------
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    console.log(id);
    userDetails.findById(id)
        .exec()
        .then(doc => {
            console.log("from database",doc);
            if(doc!=null){
                res.status(200).json(doc);
            }
            else{
                console.log("no record found");
                res.status(404).json({
                    message :"no valid enty found"
                });
            }
           
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});
// --------------------------code to insert user details----------------------------------------------
router.post('/', (req, res, next) => {
    console.log();
    const user = new userDetails({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userEmail: req.body.userPassword,
        userCategory:req.body.userCategory
    })
    user
    .save()
    .then(result => {
        console.log(result);
    });

    res.status(200).json({
        message: "user data post",
        userDetails: user
    });
});
// ---------------------------code to update user details-----------------------------------------------

router.patch('/:userId', (req, res, next) => {
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    userDetails.update({_id:id},{$set:updateOps}
        .exec()
        .then(res=>{
            console.log(res);
            res.status(200).json(res);
        }));
});

// ---------------------------code to delete user details------------------------------------------------

router.delete('/:userId', (req, res, next) => {
   const id = req.params.userId;
   userDetails.deleteMany({ _id: id})
    .exec()
    .then(result=>{
        res.status(200).json({message:result});
    })
    .catch(err=>{
        res.status(200).json(err);
    });
});

router.post('/signup', (req, res, next) => {
    userDetails.find({
        userEmail: req.body.userEmail,
    })
    .exec()
    .then(user=>{
        if(user.length >=1){
            res.status(409).json({
                message: "user details already present",
            });
        }else{
            const user = new userDetails({
                _id: new mongoose.Types.ObjectId(),
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword,
                userCategory:req.body.userCategory
            })
            user
            .save()
            .then(result => {
                console.log(result);
            });
        
            res.status(200).json({
                message: "user data post",
                userDetails: user
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    console.log(req);
    userDetails.find({
        userEmail: req.body.userEmail,
    })
    .exec()
    .then(user=>{
        console.log(user);
        if(user.length!=1){
            res.status(200).json({
                message: "user not found",
                status: "404"
            });
        }else{
            console.log(user[0].userPassword);
            if(user[0].userPassword ===req.body.userPassword ){
              const token =  jwt.sign({
                    userEmail : user[0].userEmail,
                    userPassword: user[0].userPassword
                },
                    process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
                );
                
                res.status(200).json({
                    message: "success",
                    token : token,
                    status:200
                });
            }else{
                res.status(404).json({
                    message: "please check password",
                    status:200
                });
            }
        }
    });
});

module.exports = router;