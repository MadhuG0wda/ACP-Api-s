const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const userCategoryModel = require('../models/userCategoryModel');

// -----------------------To check server is running or not----------------------------------------------
router.get('/', (req, res, next) => {
    userCategoryModel.find()
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status().json({
                error:err
            });
        });
});
// --------------------------code to get user details By Id----------------------------------------------
// router.get('/:userId', (req, res, next) => {
//     const id = req.params.userId;
//     console.log(id);
//     userModel.findById(id)
//         .exec()
//         .then(doc => {
//             console.log("from database",doc);
//             if(doc!=null){
//                 res.status(200).json(doc);
//             }
//             else{
//                 console.log("no record found");
//                 res.status(404).json({
//                     message :"no valid enty found"
//                 });
//             }
           
//         }).catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         })
// });
// --------------------------code to insert user details----------------------------------------------
router.post('/', (req, res, next) => {
  //  console.log(req.body.name+"----------------");
    const userCategory = new userCategoryModel({
        _id: new mongoose.Types.ObjectId(),
        userCategoryName: req.body.userCategoryName,
        userCategoryStatus: req.body.userCategoryStatus,
        userCategory: req.body.category
    })
    userCategory.save().then(result => {
        console.log(result);
    });

    res.status(200).json({
        message: "user data",
        userCategory: userCategory
    });
});
// ---------------------------code to update user details-----------------------------------------------

// router.patch('/:userId', (req, res, next) => {
//     const updateOps = {};
//     for(const ops of req.body){
//         updateOps[ops.propName]=ops.value;
//     }
//     userModel.update({_id:id},{$set:updateOps}
//         .exec()
//         .then(res=>{
//             console.log(res);
//             res.status(200).json(res);
//         }));
// });

// ---------------------------code to delete user details------------------------------------------------

// router.delete('/:userId', (req, res, next) => {
//    const id = req.params.userId;
//    userModel.deleteMany({ _id: id})
//     .exec()
//     .then(result=>{
//         res.status(200).json({message:result});
//     })
//     .catch(err=>{
//         res.status(200).json(err);
//     });
// });

module.exports = router;