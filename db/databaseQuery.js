var MongoClient = require('mongodb').MongoClient

var databaseQuery = function(){ 
  this.url = 'mongodb://localhost:27017/companyFinances';
}

databaseQuery.prototype = {
  all: function(collectionName){
  	console.log("ive been called")
    MongoClient.connect(this.url, function(err, db) {

      console.log("database connected at .all")

      if(err) { console.log("can't connect to url")} else {
        var collection = db.collection(collectionName); 
        collection.find().toArray(function(err, docs) {
          console.log(docs);
          db.close();
        });
      }
    });
  },

  add: function(fileToAdd, id, collectionName){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        console.log("database connected");
        db.collection(collectionName).save({"_id" : id, "processed": fileToAdd});
        db.close();
        console.log("datbase closed");
      }
    });
  },

  find: function(fileToCheck){
    MongoClient.connect(this.url, function(err,db){
      if(db){
        console.log("database connected");
        foundFile = db.collection('JsonFiles').find(fileToCheck);
        db.close();
        console.log("found file " + JSON.parse(foundFile[0]))
        console.log("datbase closed");
      }
    })
  }
}

module.exports = databaseQuery;