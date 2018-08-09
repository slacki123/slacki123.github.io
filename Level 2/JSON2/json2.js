'use strict';

var requestURL = 'https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/kings.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();



function search() {
    
    var input = document.getElementById("input").value;
    
    var requestData = request.response;
    
    var target = requestData.filter(a => Object.values(a).find(b => b.toLowerCase()===input.toLowerCase()));
    
    let para = document.getElementsByTagName('pre')[0];
    
    if(!para){
    para = document.createElement("pre");
    }
    
    para.textContent =  JSON.stringify(target, null, 2);
    
    var paragraph = document.getElementById('para');
    
    document.getElementById('para').appendChild(para);
    

   
   



    
}