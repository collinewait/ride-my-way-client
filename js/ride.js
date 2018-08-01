import {siteHeaders, goToLogin, showNoNetwork} from './reusable.js';
import {Alert} from './dialogs.js';

document.getElementById('add_ride_form').addEventListener('submit', addRide);
let loader = document.getElementById('loader');

function addRide(e){
    loader.style.display = 'block';
    e.preventDefault();

    let departure_location = document.getElementById('departure_location').value,
    destination = document.getElementById('destination').value,
    departure_date = document.getElementById('departure_date').value,
    departure_time = document.getElementById('departure_time').value,
    number_of_passengers = parseInt(document.getElementById('no_of_passengers').value);

    let data = {departure_location, destination, departure_date, departure_time,
         number_of_passengers};

    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/', {
        method: 'POST',
        headers: siteHeaders,
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.message === 'Ride added successfully'){
                loader.style.display = 'none';
                Alert.render('Ride added successfully');
            }else if(data.message === 'Ride already exists'){
                loader.style.display = 'none';
                Alert.render('Ride already exists');
            }else{
                goToLogin();
            }
        } )
        .catch(() => {
            showNoNetwork();
        });

}

document.getElementById('all_rides_button').addEventListener('click', getRidesTaken);

function getRidesTaken(){
    loader.style.display = 'block';
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/user/requests', {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message = 'Requests retrieved successfully';
            if(data.message === message){
                if(data.requests.length > 0){
                    let ridesTaken = [];
                    data.requests.forEach(ride => {
                    ridesTaken.push({
                        "driver_name": ride.driver_name,
                        "ride_id": ride.ride_id,
                        "taken_given": "Taken"
                        });
                    });
                    getRidesGiven(ridesTaken);
                }else{
                    getRidesGiven([]);
                }
            }else{
                goToLogin();
            }
            
        })
}

function getRidesGiven(ridesTaken){
    let ridedsMessage = document.getElementById('rides_taken_given_message');
    let ridesDiv =  document.getElementById('taken_given_div');
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/user/rides', {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message = 'results retrieved successfully';
            if(data.message === message){
                if(data.rides.length > 0){
                    let ridesGiven = [];
                    data.rides.forEach(ride => {
                    ridesGiven.push({
                        "driver_name": ride.driver_name,
                        "ride_id": ride.ride_id,
                        "taken_given": "Given"
                        });
                    });
                    let rides = [...ridesTaken, ...ridesGiven];
                    displayToUser(rides);
                }else if(ridesTaken.length > 0){
                    displayToUser(ridesTaken);
                }else{
                    loader.style.display = 'none';
                    ridesDiv.style.display = 'none'; 
                    ridedsMessage.innerHTML = 'You have not Given or Taken rides yet';
                    ridedsMessage.style.display = 'block';
                }
            }else{
                goToLogin();
            }
            
        })
}

function displayToUser(ridesTakenAndGiven){
    let ridesDiv =  document.getElementById('taken_given_div');
    let tableData = '';
    ridesTakenAndGiven.forEach(ride => {
        tableData += `
        <tr>
            <td>${ride.driver_name}</td>
            <td>${ride.ride_id}</td>
            <td>${ride.taken_given}</td>
        </tr>
        `;
    });
    loader.style.display = 'none';
    document.getElementById('rides_tbody').innerHTML = tableData;
    ridesDiv.style.display = 'block';
}

document.getElementById('requests_button').addEventListener('click', getUserRideOffers);

function getUserRideOffers(){
    loader.style.display = 'block';
    let requestMessage = document.getElementById('ride_request_message');
    let requestsDiv = document.getElementById('requests_div');
    requestMessage.style.display = 'none'; 
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/user/rides', {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message = 'results retrieved successfully';
            if(data.message === message){
                if(data.rides.length > 0){
                    let rideOptions = '';
                    let rideNumber = 0;
                    data.rides.forEach(ride => {
                        rideOptions += `
                            <option value=${ride.ride_id}>Ride ${rideNumber += 1}</option>
                        `;
                    });
                    loader.style.display = 'none';
                    document.getElementById('ride_offer').innerHTML = rideOptions;
                    requestsDiv.style.display = 'block';
                    getRideRequests();
                    
                }else{
                    loader.style.display = 'none';
                    requestsDiv.style.display = 'none';
                    requestMessage.innerHTML = 'You have not offered rides yet. Requests can not be made.';
                    requestMessage.style.display = 'block'; 
                }
            }else{
                goToLogin();
            }
            
        })
}

let selectElement = document.getElementById('ride_offer');
selectElement.addEventListener('change', getRideRequests);

function getRideRequests(){
    loader.style.display = 'block';
    let requestMessage = document.getElementById('ride_request_message');
    let requestsDiv = document.getElementById('requests_div');
    requestMessage.style.display = 'none'; 
    fetch(`https://carpooling-ride-my-way.herokuapp.com/api/v1/users/rides/${selectElement.value}/requests`, {
        headers: siteHeaders
    })
        .then((res) => res.json())
        .then((data) => {
            const message = 'result retrieved successfully';
            if(data.message === message){
                if(data.requests.length > 0){
                    let RequestRows = '';
                    data.requests.forEach(request => {
                        RequestRows += `
                            <tr>
                                <td>${request.passenger_name}</td>
                                <td>${request.request_status}</td>
                                <td>
                                    <button type="button" id="${request.request_id}" class="accept">Accept</button>
                                </td>
                                <td>
                                    <button type="button" id="${request.request_id}" class="reject">Reject</button>
                                </td>
                            </tr>
                        `;
                    });
                    loader.style.display = 'none';
                    document.getElementById('ride_requests').innerHTML = RequestRows;
                    requestsDiv.style.display = 'block';
                }else{
                    loader.style.display = 'none';
                    requestsDiv.style.display = 'none';
                    requestMessage.innerHTML = 'No requests made on the ride yet.';
                    requestMessage.style.display = 'block'; 
                }
            }else{
                goToLogin();
            }
        })
}
