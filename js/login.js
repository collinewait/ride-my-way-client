import {Alert} from './dialogs.js';
import {myCookie} from './cookie_file.js';
document.getElementById('login_user').addEventListener('submit', loginUser);
function loginUser(e){
    e.preventDefault();

    let email_address = document.getElementById('email_address').value;
    let password = document.getElementById('password').value;
    const data = {email_address, password};

    fetch('https://carpooling-ride-my-way.herokuapp.com/api/v1/auth/login/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
        .then((res) => {
            if(res.status=='401'){
                Alert.render('Incorrect email address or password');
            }
            else if (res.status=='200'){
                window.location.href = 'user.html';
            }
            return res.json();
        })
        .then(result => {
            console.log(result.auth_token);
            myCookie.setCookie("auth_token", result.auth_token, 2);
            console.log(myCookie.getCookie("auth_token"));
        })
        .catch(error => {
            console.log('Failure', error);
            Alert.render('Something wrong happened, Please try again.');
       });
}