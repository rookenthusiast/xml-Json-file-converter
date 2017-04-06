var DatabaseQuery = require('./databaseQuery');
var fs = require('fs');
var mv = require('mv');
var parseString = require('xml2js').parseString;

var XmlExtractor = function(){
	this.database = new DatabaseQuery()
	console.log(this.database);
}

XmlExtractor.prototype = {

	processDir : function(){
		var self = this;
	console.log('finding directory')
	var totalBytes = 0;
	var dir = '/home/cameron/Documents/xml_data/xml/';
	fs.readdir(dir, function(err, files){
		if (err) {
			console.log("cant find directory") 
		} else {
			console.log('attempting to read files')
			var filesCompleted = 0;
			files.forEach(function(file){
			
				fs.readFile(dir + file, 'UTF-8',function(err,data){
					if (file === {}){ console.log("No files found")} else {
					if (err) {
						console.log("error reading file", err);
						} else {
						console.log("beginning conversion of: " + file);
						var id = " " + file;
						
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
						
						var convertedXmlFile = convertXmlToJson(data);


						var jString = JSON.stringify(convertedXmlFile);
						var replacedString = jString.replace(/\$/g, "Access")
						console.log(replacedString);
						var jParsed = JSON.parse(replacedString);

						var returnedDebtItem = jParsed.BACSDocument.Data[0].ARUDD[0].Advice[0].OriginatingAccountRecords[0].OriginatingAccountRecord[0].ReturnedDebitItem;
						var newJsonObj = JSON.parse(replacedString);
						console.log(newJsonObj);
						console.log("adding new JSON document")
						self.database.add(newJsonObj, id, "JsonFiles");
						self.database.add(returnedDebtItem, id, 'ReturnedDebitItems');
						filesCompleted += 1;


						mv(dir + file, '/home/cameron/Documents/xml_data/archive/'+ file,{mkdirp: true}, function(err){
							if (err) {
								console.log("been an error archiving", err);
							}
							else {
								console.log("file has been archived");
							}
						})
					}
				 


						

						totalBytes += data.length;
						if (filesCompleted === files.length){
						console.log("total bytes of data:" + totalBytes);
						console.log(filesCompleted + ": file conversions completed")
					



						}
					}	
				})
			
			})
		}
	})
	}
}


module.exports = XmlExtractor;