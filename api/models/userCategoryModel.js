const mongoose = require('mongoose')
// ------------------------------user model--------------------------------------------

const usercategories = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userCategoryName : {type :String , required : true},
    userCategoryStatus : {type :String , required : true},
    userUpdatedDate : {type :Date, default : Date.now},
    userCreatedDate : {type :Date, default : Date.now}
})

module.exports = mongoose.model('userCategory',usercategories);