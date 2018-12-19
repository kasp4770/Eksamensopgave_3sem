var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

//viser objekter i databasen
router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TwinShips");
    dbo.collection("ship").find({}).toArray(function (err, result) { //result er hele objektet
      if (err) throw err;
      //console.log(result);
      var obj = {};
      obj.title = 'Skibe';
      obj.ship = result;
      res.render('ships', obj);
      db.close();
    });
  });
});

router.get('/:id', function(req, res, next){
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("TwinShips");
    dbo.collection("ship").findOne({_id: ObjectId(req.params.id)}, function(err, result){
      if(err) throw err;

      //Til at se om jeg trækker data'en korrekt ud, hvis ikke det fungerer korrekt i browseren
      console.log(req.params.id);
      console.log(result);

      res.json(result);
      db.close();
    });
  });
});

router.post('/', function(req, res, next){
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("TwinShips");

    //Sammensætter data fra HTML-formen i et objekt som svarer til de samme keys i et eksisterende document fra 'ship'-collection
    var ship = {}; //Deklarerer variabel 'ship' og initaliserer det med et tomt objekt
    ship.name = req.body.name;
    ship.homeCity = req.body.homeCity;
    ship.callSign = req.body.callSign;
    ship.uniqMMSI = req.body.mmsi;
    ship.usedAs = req.body.usedAs;
    ship.brtbt = req.body.brtbt;
    ship.length = req.body.length;
    ship.maxCrewNo = req.body.maxCrewNo;
    ship.sensor_id = ""; 

    dbo.collection("ship").insertOne(ship, function(err, result){
      if(err) throw err;
      console.log("Et skib oprettet! Navn: " + ship.name);
      db.close();
    });
  });
  res.redirect('/ships');
});

module.exports = router;