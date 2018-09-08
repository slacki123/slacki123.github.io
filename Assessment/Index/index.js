var json = document.getElementById("jsonDropdown");
var forms = document.getElementById("formsDropdown");
var manipulation = document.getElementById("manipulation");
var enform = document.getElementById("enform");
var formdata = document.getElementById("formdata");

function hide() {
	json.hidden = true;
	forms.hidden = true;
	
	manipulation.innerHTML = "JSON Manipulation";
	manipulation.style = "background-color: white";

}

function jsonDropdown() {
	
	json.hidden = false;
	
		
}

function formsDropdown() {
	
	forms.hidden = false;
}

function addAsterisk() {
		
	manipulation.innerHTML = "* JSON Manipulation";
	manipulation.style = style="background-color: yellow";
	
}

function addAsterisk2() {
	
	enform.innerHTML = "* Entry Form "
	enform.style = "background-color: yellow";
	
}

function addAsterisk3() {
	
	formdata.innerHTML = "* Form Data";
	formdata.style = "background-color: yellow";
	
}

function asteriskOut2() {
	
	enform.innerHTML = "Entry Form "
	enform.style = "background-color: white";
	
}

function asteriskOut3() {
	
	formdata.innerHTML = "Form Data"
	formdata.style = "background-color: white";
	
	
}
