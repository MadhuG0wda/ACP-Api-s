const express = require('express')
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:"user data get"
    });
});

router.get('/:userId', (req,res,next)=>{
    res.status(200).json({
        message:"user data get",
        userId:req.params.userId
    });
});

router.post('/', (req,res,next)=>{
    res.status(200).json({
        message:"user data post"
    });
});

router.patch('/:userId', (req,res,next)=>{
    res.status(200).json({
        message:"user updated",
        userId:req.params.userId
    });
});

router.delete('/:userId', (req,res,next)=>{
    res.status(200).json({
        message:"user deleted",
        userId:req.params.userId
    });
});

module.exports = router;