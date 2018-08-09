'use strict';

var requestURL = 'https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/example.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function search() {
    
    var requestData = request.response;
    var myH1 = document.createElement('p');
    
    var stringified = myH1.textContent;
    myH1.textContent = JSON.stringify(requestData, null, 2);
    
    
    
    document.getElementsByTagName('pre')[0].appendChild(myH1);
    
}