var XmlExtractor = require('../../../db/xmlExtractor.js')

var UI = function (){

	// var xmlExtractor = new XmlExtractor();
 	// this.entry();
}

UI.prototype = { 
 
	// entry: function(){
	// 	console.log("entry has been called")
	// 	var body = document.querySelector('body');
	// 	var header = document.createElement('h1');
	// 	var info = document.createElement('h2');
	// 	header.innerHTML = "Welcome to XML extractor app"
	// 	info.innerHTML = "To begin processing data stored in your specified directory click process or view the database for all returned debit items "
	// 	body.appendChild(header);
	// 	body.appendChild(info);

	// 	var button = document.createElement('button');
	// 	button.onclick = xmlExtractor.processDir();
	// 	button.innerHTML = "Process Data"
	// 	body.appendChild(button);
	// }

}

module.exports = UI;