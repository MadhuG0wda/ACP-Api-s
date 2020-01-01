// -----------------------------configuration header---------------------------------------------

const express = require('express')
const app = express();
const userRoutes = require('./api/routes/userRoutes');
const usersCategory = require('./api/routes/usersCategoryRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')
const mongoose = require('mongoose')

// -----------------------------configuration intilize---------------------------------------------
var cors = require('cors');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors())
// -----------------------------mongoDB connection-------------------------------------------------

var mongoDB = 'mongodb://127.0.0.1/admin_panel';
mongoose.connect(mongoDB, { useUnifiedTopology : true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -----------------------------Access permission for UI-------------------------------------------

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    console.log("Calling");
    if (req.method ==='OPTIONS'){
        app.header('Access-Control-Allow-Methods',' PUT, POST, PATCH, DELETE, GET');
        console.log("Calling");
        return res.status(200).json({
            msg :"connected"
        });
    }
  });
   
  app.use('/users',userRoutes);
  app.use('/usersCategory',usersCategory);  
// -----------------------------Controllers calling-------------------------------------------------

app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

// -----------------------------Error handing while calling controller------------------------------

app.use((error,req,res,next) => {
    res.status(error.status ||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

// -------------------------------------module exports----------------------------------------------

module.exports = app;