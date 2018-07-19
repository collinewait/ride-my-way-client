// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click(); 

function openDriverAction(evt, driverAction) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(driverAction).style.display = "block";
    evt.currentTarget.className += " active";

}

//modal
// Get the modal
var modal = document.getElementById('details_modal');

// Get the button that opens the modal
var btn = document.getElementById("view_details");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the button that closes the modal
var btn1 = document.getElementById("cancel_request");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on the button, close the modal
btn1.onclick = function(){
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 