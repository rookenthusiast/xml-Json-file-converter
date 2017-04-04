var MongoClient = require('mongodb').MongoClient

var databaseQuery = function(){ 
  this.url = 'mongodb://localhost:27017/companyFinances';
}

databaseQuery.prototype = {
  all: function(){
  	console.log("ive been called")
    MongoClient.connect(this.url, function(err, db) {
      if(err) { console.log("can't connect to url")} else {
        var collection = db.collection('JsonFiles'); 
        collection.find().toArray(function(err, docs) {
          console.log(docs);
        });
      }
    });
  },

  add: function(fileToAdd){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        var collection = db.collection('JsonFiles');
        collection.insert(fileToAdd);
        collection.find().toArray(function(err, docs) {
          if (err){ console.log("file can't be added due to:", err)}
            else {console.log("File has been added to Database");
          console.log(docs);}
        });
      }
    });
  }
}

module.exports = databaseQuery;