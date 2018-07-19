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

