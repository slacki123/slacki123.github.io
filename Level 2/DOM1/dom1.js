var doc;
var txt;

function createParagraph(){
    
   
   doc = document.createElement("p");
   doc.setAttribute("id", "paragraph");
   document.getElementById("para").hidden=false;
    
    }


function paragraphAsTextbox(){
    
    
    
   try{
       
   if(txt!=null){
       txt.remove();
   }
       
   txt = document.createTextNode(document.getElementById("inputField").value);
   doc.appendChild(txt);
   document.getElementById("output").innerHTML = doc.innerHTML;
    
    }
     catch (err) {
         document.getElementById("output").innerHTML = "You need to create a paragraph first";
    }
    
}

function deleteParagraph() {
    
//    document.getElementById("output").innerHTML = "";
//    document.getElementById("inputField").value = null;
//    document.getElementById("para").hidden=true;
    location.reload();
    
}