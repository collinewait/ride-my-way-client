import {Alert} from './dialogs.js';
import {siteHeaders, goToLogin} from './reusable.js';
document.getElementById('defaultOpen').addEventListener('click', getAllRides);
let loader = document.getElementById('loader');

document.getElementById('defaultOpen').click();

function getAllRides(){
    loader.style.display = 'block';
    let rideOffersMessage = document.getElementById('ride_offers_message');
    let allRidesDiv = document.getElementById('all_rides_div');
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/', {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message  = 'results retrieved successfully';
            if (data.message === message){
                if(data.rides.length > 0){
                    let tableRows = '';
                    data.rides.forEach(ride => {
                        tableRows += `
                            <tr>
                                <td>${ride.driver_name}</td>
                                <td>${ride.driver_id}</td>
                                <td>
                                    <button class="view_details" id="${ride.ride_id}">View Details</button>
                                </td>
                            </tr>
                        `;
                    });
                    loader.style.display = 'none';
                    document.getElementById('rides_data').innerHTML = tableRows;
                    allRidesDiv.style.display = 'block';
                    makeDetailsModelActive();
                }else{
                    loader.style.display = 'none';
                    allRidesDiv.style.display = 'none';
                    rideOffersMessage.innerHTML = 'No rides currently available';
                    rideOffersMessage.style.display = 'block';
                }
            
            }else{
                goToLogin();
            }
        });
}

let ride_id = null;

// Get the modal
function makeDetailsModelActive() {

    const modal = document.getElementById('details_modal');

    // Get the button that opens the modal
    let btns = document.getElementsByClassName('view_details');
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];
    
    // Get the button that closes the modal
    const btn1 = document.getElementById('cancel_request');
    
    // When the user clicks on the button, open the modal
    [].forEach.call(btns, (el) => {
        el.addEventListener('click', () => {
            modal.style.display = 'block';
            getSingleRide(el.id);
            ride_id = el.id;
        });
    });
    
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

}

function getSingleRide(rideId){
    loader.style.display = 'block';
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/'+rideId, {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message = 'result retrieved successfully';
            if(data.message === message){

                let tableRow = `
                <tr>
                    <td>${data.ride.departure_location}</td>
                    <td>${data.ride.destination}</td>
                    <td>${data.ride.departure_date}</td>
                    <td>${data.ride.departure_time}</td>
                    <td>${data.ride.number_of_passengers}</td>
                </tr>
            `;
                loader.style.display = 'none';
                document.getElementById('ride_data').innerHTML = tableRow;

            }else{
                goToLogin();
            }
            
        });

}

document.getElementById('ride_request').addEventListener('click', joinARide);

function joinARide(){
    loader.style.display = 'block';
    fetch(`https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/${ride_id}/requests`, {
        method: 'POST',
        headers: siteHeaders,
        cache: 'no-cache'
    })
    .then((res) => res.json())
    .then((data) => {
        let responseMessage = data.message;
        if(responseMessage === 'request sent successfully'){
            loader.style.display = 'none';
            Alert.render('Request sent successfully!');
        }else if(responseMessage === 'Request already exists'){
            loader.style.display = 'none';
            Alert.render('Request already exists!');
        }else{
            goToLogin();
        }
    })
    .catch(error => {
        console.error(error);
        loader.style.display = 'none';
        Alert.render('No network, Please try again.');
    });

}
