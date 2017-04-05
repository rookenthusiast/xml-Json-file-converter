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
						var replacedString = jString.replace(/\$/g, "Access")
						console.log(replacedString);
						var jParsed = JSON.parse(replacedString);

						var returnedDebtItem = jParsed.BACSDocument.Data[0].ARUDD[0].Advice[0].OriginatingAccountRecords[0].OriginatingAccountRecord[0].ReturnedDebitItem;
						var newJsonObj = JSON.parse(replacedString);
						console.log(newJsonObj);
						console.log("adding new JSON document")
						dataBase.add(newJsonObj, id, "JsonFiles");
						dataBase.add(returnedDebtItem, id, 'ReturnedDebitItems');
						filesCompleted += 1;
						} 

						

						totalBytes += data.length;
						if (filesCompleted === files.length){
						console.log("total bytes of data:" + totalBytes);
						console.log(filesCompleted + ": file conversions completed")
						dataBase.all("JsonFiles");
						dataBase.all("ReturnedDebitItems");
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