import {myCookie} from './cookie_file.js';
export const siteHeaders = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'auth_token': myCookie.getCookie('auth_token')
}