function openDriverAction(event, driverAction) {
    
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(driverAction).style.display = 'block';
    event.className += ' active';

}

let offersTab = document.getElementById('defaultOpen'),
    requestsTab = document.getElementById('requests_button'),
    addRideTab = document.getElementById('add_ride_button'),
    allRidesTab = document.getElementById('all_rides_button');

offersTab.addEventListener('click', () => openDriverAction(offersTab, 'view_offers'));
offersTab.click();
requestsTab.addEventListener('click', () => openDriverAction(requestsTab, 'view_requests'));
addRideTab.addEventListener('click', () => openDriverAction(addRideTab, 'add_ride'));
allRidesTab.addEventListener('click', () => openDriverAction(allRidesTab, 'all_rides'));

//modal
// Get the modal
const modal = document.getElementById('details_modal');

// Get the button that opens the modal
const btn = document.getElementById('view_details');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// Get the button that closes the modal
const btn1 = document.getElementById('cancel_request');

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = 'block';
};

// When the user clicks on the button, close the modal
btn1.onclick = function(){
    modal.style.display = 'none';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}; 