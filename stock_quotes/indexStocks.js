document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	//getTemp links to the HTML code block 
	document.getElementById('getTemp').addEventListener('click', function(e){
		//key var fields that includes the URL to get data, key, and input values
		var req = new XMLHttpRequest();
		var url = "https://api.iextrading.com/1.0/tops?";
		//this is my custom key - use wisely
		//var appId = "&appid=448558d905c237ee1064dd5aef3d8f96";
		var inputQuote = document.getElementById("getQuote").value;
		var theQuote = "symbols=" + inputQuote;
		
		//create the final URL to be used in the GET
		//remove appID from equation
		//remove '&units=imperial' from equation
		var urlToUse = url + theQuote;
		//GET request
		req.open("GET", urlToUse, false);
		req.addEventListener('load', function() {
			//Asynchronous request
			if (req.status >= 200 && req.status < 400) {
				var res = JSON.parse(req.responseText);
				//use the response and assing appropriate responses to element IDs
				document.getElementById('getSymbol').innerHTML = res[0].symbol;
                document.getElementById('getLastSalePrice').innerHTML = res[0].lastSalePrice;
				document.getElementById('getLastSaleSize').innerHTML = res[0].lastSaleSize;
				document.getElementById('getVolume').innerHTML = res[0].volume;
				console.log(res);
			} 
		});
		req.send();
		e.preventDefault();
	});
}