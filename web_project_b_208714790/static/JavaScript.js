
function GetLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      document.getElementById("p").innerHTML = "Geo;ocation is not supported";
  }
}

function showPosition(position) {
  var x = document.getElementById('p');
  var y = document.getElementById("BTN");
  x.innerHTML = "Latitude: " + position.coords.latitude 
  + "longtitide: " + position.coords. longitude;
  
  $(document).ready(function(){
    $(".geoLocation").click(function () {
       //this is change select value 1
        $('#dynamicChange').val("position").trigger('change');
    });
  });
}

// Below Function Executes On Form Submit
function ValidationEvent() {
  let email =document.forms["myForm"]["email"].value;
  let passward = document.forms["myForm"]["password"].value;
  let repassward = document.forms["myForm"]["repassword"].value;
  let FirstName = document.forms["myForm"]["fname"].value;
  let LastName = document.forms["myForm"]["lname"].value;
  // Conditions
  if(document.getElementById("male").checked || document.getElementById("female").checked){
    if(passward.localeCompare(repassward)==0){
      if (FirstName.length > 1 && LastName.length > 1){
        return true
      } else {
        alert("Your name seems to be wrong..");
        return false;
      }
    } else{
      alert("Your passards don't match..");
      return false;
    }
  } else{
    alert("Please fill in your gender..");
    return false;
  }
}

function ShowTable() {   
  let min =document.getElementById("inputmin");
  let max =document.getElementById("inputmax");  
   if (parseFloat(max.value) < parseFloat(min.value)){     
    alert("the prices don't match");   
  } else{     
    var x = document.getElementById("myTable");     
      x.style.display = "block";    
        var resetBtn = document.getElementById("findtickets");
        resetBtn.style.display = "none";
        var div = document.getElementById("whatYouWantToHide");
        div.style.display = "block";
      }   
    }
  
    function Reset(){
      window.location.reload();
    }