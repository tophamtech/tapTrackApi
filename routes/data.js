var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var User   = require('../app/models/user'); // get our mongoose model
var Group = mongoose.model('Group');

var User = mongoose.model('User');
var app = express.Router();

//TODO:update swagger for get and post

app.post('/', function(req, res) {
  found = false;
  Group.findOne({title : req.decoded._doc.group}, function(err,group){
    for (i=0; i<group.keyValue.length;i++){
      if (group.keyValue[i].target == req.body.tar){
        found = true;
         group.keyValue[i].value = req.body.val;
         group.save();
         res.status(200).send({
           updated : true
         });
         break;
      }
    }
    if (!found){
      group.keyValue.push({target: req.body.tar, value: req.body.val})
      group.save();
      res.status(200).send({
        created: true
      });
    }
  });
});

app.get('/', function(req, res) {
  found = false;
  Group.findOne({title : req.decoded._doc.group}, function(err,group){
    for (i=0; i<group.keyValue.length;i++){
      if (group.keyValue[i].target == req.query.tar){
         found = true;
         res.status(200).send({
           cVal: group.keyValue[i].value
         });
         break;
      }
    }
    if (!found){
      res.status(200).send({
        found: false
      });
    }
  });
});

module.exports = app;
