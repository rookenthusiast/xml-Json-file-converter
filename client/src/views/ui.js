

var UI = function (){
	this.entry();
}

UI.prototype = { 
 
	entry: function(){
		var self = this;
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
		button.onclick = function(){this.loadReturnedDebitItems(self)}.bind(this)
		body.appendChild(button);
	},

	processMessage: function(){
		setTimeout(function() { alert("Files have been processed"); }, 3000);
	},

	loadReturnedDebitItems: function(self) {	
		
		console.log("return debit items fired")
		var element = document.querySelector(".info");
		console.log(element);
		if (element !== null){
    	element.parentNode.removeChild(element);
    	}

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/loadReturnedDebitItems");
  request.send(null);
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	console.log(self);
      var body = document.querySelector("body");
      var div = document.createElement("div");
		div.className = "info";
      var responseData = JSON.parse(this.responseText);
      console.log(responseData[0].processed)
      self.createListView(responseData[0].processed, div);
      body.appendChild(div);
    }
  }
},

  createListView: function(data, container){
  	console.log("createListView called")
  	var ul = document.createElement("ul")
  	
  	console.log(container)
  	for (object of data){
  		var hr = document.createElement("hr")
  		var  ref = document.createElement("li")
  		var transCode = document.createElement("li")
  		var returnCode = document.createElement("li")
  		var returnDescription = document.createElement("li")
  		var originalProcessingDate = document.createElement("li")
  		var valueOf = document.createElement("li")
  		var currency = document.createElement("li")
  		
  		
  		ref.innerHTML = "Ref: " + object.Access.ref;
  		transCode.innerHTML = "TransCode: " + object.Access.transcode;
  		returnCode.innerHTML = "returnCode " + object.Access.returnCode;
  		returnDescription.innerHTML = "returnDescription: " + object.Access.returnDescription;
  		originalProcessingDate.innerHTML = "originalProcessingDate: " + object.Access.originalProcessingDate;
  		valueOf.innerHTML = "valueOf: " + object.Access.valueOf;
  		currency.innerHTML = "currency: " + object.Access.currency;


  		ul.appendChild(ref)
  		ul.appendChild(transCode)
  		ul.appendChild(returnCode)
  		ul.appendChild(returnDescription)
  		ul.appendChild(originalProcessingDate)
  		ul.appendChild(valueOf)
  		ul.appendChild(currency)
  		

  		var  bankName = document.createElement("li")
  		var branchName = document.createElement("li")
  		var name = document.createElement("li")
  		var number = document.createElement("li")
  		var ref = document.createElement("li")
  		var sortCode = document.createElement("li")
  		
  		bankName.innerHTML = "Bank Name: " + object.PayerAccount[0].Access.bankName
  				branchName.innerHTML = "Branch Name: " + object.PayerAccount[0].Access.branchName
  		name.innerHTML = "Name: " + object.PayerAccount[0].Access.name
  		number.innerHTML = "Number: " + object.PayerAccount[0].Access.number
  		ref.innerHTML = "Ref: " + object.PayerAccount[0].Access.ref
  		sortCode.innerHTML = "Sort Code: " + object.PayerAccount[0].Access.sortCode

  		ul.appendChild(bankName)
  		ul.appendChild(branchName)
  		ul.appendChild(name)
  		ul.appendChild(number)
  		ul.appendChild(ref)
  		ul.appendChild(sortCode)
  		ul.appendChild(hr)


  	}

  	container.appendChild(ul);
  }
}

	



module.exports = UI;