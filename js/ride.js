import {myCookie} from './cookie_file.js';
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
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        },
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
                window.location.href = 'index.html';
            }
        } )
        .catch(error => {
            console.error(error);
            Alert.render('No network, Please try again.');
        });

}

document.getElementById('all_rides_button').addEventListener('click', getRidesTaken);

function getRidesTaken(){
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/user/requests', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let ridesTaken = [];
            data.requests.forEach(ride => {
                ridesTaken.push({
                    "driver_name": ride.driver_name,
                    "ride_id": ride.ride_id,
                    "taken_given": "Taken"
                });
                getRidesGiven(ridesTaken);
            });
            
            console.log(ridesTaken);
        })
}

function getRidesGiven(ridesTaken){
    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/user/rides', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
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
        })
}

function displayToUser(ridesTakenAndGiven){
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
    document.getElementById('rides_tbody').innerHTML = tableData;
}
