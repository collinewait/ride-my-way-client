import {myCookie} from './cookie_file.js';
import {Alert} from './dialogs.js';
export const siteHeaders = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'auth_token': myCookie.getCookie('auth_token')
}

export function goToLogin(){
    return window.location.href = 'index.html';
}

export function showNoNetwork(){
    loader.style.display = 'none';
    Alert.render('No network, Please try again.');
}