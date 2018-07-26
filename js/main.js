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
