// Function to check letters and numbers
let name = document.getElementById("name");
let dob = document.getElementById("dob");
let addr = document.getElementById("address");
let postcode = document.getElementById("postcode");
let email = document.getElementById("email");
let form = document.getElementById("form");


function checkFilled(){
	
	var input = name.value;
	var input2 = postcode.value;
		
		console.log(input);
		
	var letters = /^[a-zA-Z0-9]+$/;
	
	if(name.value == "" || dob.value == "" || addr.value == "" || postcode.value == ""){
		alert("All the fields must be filled first!");
		
		form.hidden = false;
		
		return false;
	}
	
	else if(!input.match(letters) || !input2.match(letters)) {
		
		alert('Please input alphanumeric characters only');
		
		form.hidden = false;
		
		return false;
		
	}
	
	else if (postcode.value.length > 10) {
		
		alert("postcode must be less than 10 characters")
		
		form.hidden = false;
		
		return false;
	}
	
	
	else 
		
		{
			
		localStorage.setItem("1", name.value);
		localStorage.setItem("2", dob.value);
		localStorage.setItem("3", addr.value);
		localStorage.setItem("4", postcode.value);
		localStorage.setItem("5", email.value);
			
		form.hidden = true;
			
			return true;
			
			
		}

}

function displayPrevious() {
	
	if(form.hidden == true){
		
		document.getElementById("para").innerHTML = "The information stored on the previous page was as follows: <br> Name: '" + localStorage.getItem("1") + "'<br> Date of Birth: '" + localStorage.getItem("2") + "'<br> Address: '" + localStorage.getItem("3") + "'<br> PostCode: '" + localStorage.getItem("4") + "'<br> Email: '" + localStorage.getItem("5") +"'";
		
	}
	
}