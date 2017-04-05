

var UI = function (){
	this.entry();
}

UI.prototype = { 
 
	entry: function(){
		console.log("entry has been called")
		var body = document.querySelector('body');
		var header = document.createElement('h1');
		var info = document.createElement('h2');
		header.innerHTML = "Welcome to XML extractor app"
		info.innerHTML = "To begin processing data stored in your specified directory click process or view the database for all returned debit items "
		body.appendChild(header);
		body.appendChild(info);

		var form = document.createElement('form');
		form.method = "post";
		form.action = "/"
		
		var input = document.createElement('input');
		input.type = "submit";
		input.value = "Process";
		input.onclick = this.processMessage;

		form.appendChild(input);
		body.appendChild(form);

		var button = document.createElement('button')
		button.innerHTML = "Returned Debit Data";
		button.onclick = this.loadReturnedDebitItems;
		body.appendChild(button);
	},

	processMessage: function(){
		setTimeout(function() { alert("Files have been processed"); }, 3000);
	},

	loadReturnedDebitItems: function() {
		console.log("return debit items fired")
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/loadReturnedDebitItems");
  request.send(null);
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var body = document.querySelector("body");
      var p = document.createElement('p');
      p.innerHTML = this.responseText;
      body.appendChild(p);
    }
  };
}

	

}

module.exports = UI;