import {myCookie} from './cookie_file.js';

document.getElementById('defaultOpen').addEventListener('click', getAllRides);
let loader = document.getElementById('loader');

document.getElementById('defaultOpen').click();

function getAllRides(){
    loader.style.display = 'block';
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        }
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
                    makeDetailsModelActive();
                }else{
                    loader.style.display = 'none';
                    document.getElementById('all_rides_div').innerHTML = '<h2>No rides currently available</h2>';
                }
            
            }else{
                
                window.location.href = 'index.html';
            }
        });
}

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
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        }
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
                window.location.href = 'index.html';
            }
            
        });

}
