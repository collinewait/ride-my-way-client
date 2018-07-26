//import {Alert} from './dialogs.js';
import {myCookie} from './cookie_file.js';

document.getElementById('defaultOpen').addEventListener('click', getAllRides);
document.getElementById('defaultOpen').click();

function getAllRides(){

    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/rides/', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'auth_token': myCookie.getCookie('auth_token')
        }
    })
        .then((res) => res.json())
        .then((data) => {
            let tableRows = '';
            data.rides.forEach(ride => {
                tableRows += `
                    <tr>
                        <td>${ride.driver_name}</td>
                        <td>${ride.driver_id}</td>
                        <td>
                            <button class="view_details">View Details</button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('rides_data').innerHTML = tableRows;
            makeDetailsModelActive();
        });
}

// Get the modal
function makeDetailsModelActive() {

    const modal = document.getElementById('details_modal');

    // Get the button that opens the modal
    let btns = document.getElementsByClassName('view_details');
    console.log(btns);
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];
    
    // Get the button that closes the modal
    const btn1 = document.getElementById('cancel_request');
    
    // When the user clicks on the button, open the modal
    [].forEach.call(btns, (el) => {
        console.log(el);
        el.addEventListener('click', () => {
            modal.style.display = 'block';
        });
        //el.click();
        //console.log("el clicks");
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
