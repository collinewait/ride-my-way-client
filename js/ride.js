document.getElementById('add_ride_form').addEventListener('submit', addRide);

function addRide(e){
    e.preventDefault();

    let departure_location = document.getElementById('departure_location').value,
    destination = document.getElementById('destination').value,
    departure_date = document.getElementById('departure_date').value,
    departure_time = document.getElementById('departure_time').value,
    number_of_passengers = parseInt(document.getElementById('no_of_passengers').value);

    let data = {departure_location, destination, departure_date, departure_time,
         number_of_passengers};
    console.log(data);

}