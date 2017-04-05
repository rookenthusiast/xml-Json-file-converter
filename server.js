var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var parseString = require('xml2js').parseString;
var DatabaseQuery = require('./db/databaseQuery')
var MongoClient = require('mongodb').MongoClient

var dataBase = new DatabaseQuery(); 
// this.url = 'mongodb://localhost:27017/companyFinances';



var processDir = function(){
	console.log('finding directory')
	var totalBytes = 0;
	var dir = '/home/cameron/Documents/xml_data';
	fs.readdir(dir, function(err, files){
		if (err) {
			console.log("cant find directory") 
		} else {
			console.log('attempting to read files')
			var filesCompleted = 0;
			files.forEach(function(file){
				fs.readFile(dir + '/' + file, 'UTF-8',function(err,data){
					if (err) {
						console.log("error reading file", err);
						} else {
						console.log("beginning conversion of: " + file);
						var id = " " + file;
						console.log(id);
						var convertedXmlFile = convertXmlToJson(data);


						var jString = JSON.stringify(convertedXmlFile);
						var replacedString = jString.replace(/\$/g, "replacedSymbol")
						
						var newJsonObj = JSON.parse(replacedString);
						console.log("adding new file")
						dataBase.add(newJsonObj, id);
						filesCompleted += 1;
						} 

						

						totalBytes += data.length;
						if (filesCompleted === files.length){
						console.log("total bytes of data:" + totalBytes);
						console.log(filesCompleted + ": file conversions completed")
						dataBase.all();
						}	
				})
			})
		}
	})
}

var convertXmlToJson = function(xml){
	var jsonObject = null;

 	parseString(xml, function(err, result){
		if(err){
			console.log("There's been an error converting data:", err)
		} else {
		var jsonData = result;
		}
		jsonObject = jsonData;
    })
    return jsonObject;
}

// MongoClient.connect(this.url, function(err, db) {
//       if(db){
//         console.log("database connected");
//         // var collection = db.collection('JsonFiles');
//         // collection.insert(fileToAdd);
//         db.collection('JsonFiles').insert(jsonFromXmlData[0]);
//         db.close();
//         console.log("database closed");
//     	}
//     })






processDir();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(3000, function () {
  console.log('server running at '+this.address().port);
});