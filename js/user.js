const password = document.getElementById('user__password');
const confirm_password = document.getElementById('cpassword');

function validatePassword() {
    'use strict';
    if (password.value !== confirm_password.value) {
        confirm_password.setCustomValidity('Passwords Do not Match');
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

document.getElementById('signup').addEventListener('submit', addUser);

function addUser(e){
    e.preventDefault();

    let first_name = document.getElementById('fname').value;
    let last_name = document.getElementById('lname').value;
    let email_address = document.getElementById('email').value;
    let phone_number = document.getElementById('phone_no').value;
    let password = document.getElementById('user__password').value;
    const data = {first_name, last_name, email_address, phone_number,password};

    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/auth/signup/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
        .then((res) => {
            if(res.status=='400'){
                console.log(data);
                alert('Sorry, User already exists');
            }
            else if (res.status=='201'){
                console.log(data);
                alert('You have successfully registered. You can login');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.log('Failure', error);
            alert('Something wrong happened, Please try again.');
        });
}
