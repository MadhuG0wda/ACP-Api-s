const mongoose = require('mongoose')
// ------------------------------user model--------------------------------------------

const userDetails = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
   // userName : {type :String , required : true},
    userEmail : {type :String , required : true},
    // userPhoneNumber : String,
    // userPhotos : String,
    // userStatus : String,
    // userFirstName : {type :String , required : true},
    // userLastName : String,
    // userGender : String,
    // userCity: String,
    // userState: String,
    // userCountry: String,
    // usertimeCreated: {type :Date, default : Date.now},
    // usertimeUpdate: {type :Date, default : Date.now},
     userPassword: {type :String , required : true},
     userCategory:{ type: mongoose.Schema.Types.ObjectId , ref : 'userCategory' , required : true}
});

module.exports = mongoose.model('userDetails',userDetails);