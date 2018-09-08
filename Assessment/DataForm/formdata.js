onload = function displayData() {
	
document.getElementById("para").innerHTML = "The information stored on the previous page was as follows: <br> Name: '" + localStorage.getItem("1") + "'<br> Date of Birth: '" + localStorage.getItem("2") + "'<br> Address: '" + localStorage.getItem("3") + "'<br> PostCode: '" + localStorage.getItem("4") + "'<br> Email: '" + localStorage.getItem("5") +"'";
	
}