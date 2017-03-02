document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	//getTemp links to the HTML code block 
	document.getElementById('getTemp').addEventListener('click', function(e){
		//key var fields that includes the URL to get data, key, and input values
		var req = new XMLHttpRequest();
		var url = "https://api.iextrading.com/1.0/tops?";
		//this is my custom key - use wisely
		//var appId = "&appid=448558d905c237ee1064dd5aef3d8f96";
		var inputCity = document.getElementById("getCity").value;
		var inputZIP = document.getElementById("getZIP").value;
		//control condition to select either city or zip to use in the GET
		//If there is nothing in the zip field, then use the city field.
		//else,  if there is anything in the zip field, use the zip field. 
		if (inputZIP === '') {
			var zORc = "symbols=" + inputCity;
		} else {
			var zORc = "zip=" + inputZIP;
		}
		//create the final URL to be used in the GET
		//remove appID from equation
		//remove '&units=imperial' from equation
		var urlToUse = url + zORc;
		//GET request
		req.open("GET", urlToUse, false);
		req.addEventListener('load', function() {
			//Asynchronous request
			if (req.status >= 200 && req.status < 400) {
				var res = JSONP.parse(req.responseText);
				//use the response and assing appropriate responses to element IDs
				document.getElementById('city').innerHTML = res[0].symbol;
                document.getElementById('temp').innerHTML = res[0].lastSalePrice;
				
				//document.getElementById('city').textContent = res[0].symbol;
				//document.getElementById('temp').textContent = res[0].lastSalePrice;
				console.log(res);
			} 
		});
		req.send();
		e.preventDefault();
	});
}
