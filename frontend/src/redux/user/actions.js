import api from "api.js";
import {LOGIN, LOGOUT} from "redux/user/actionTypes.js";

//actions
function login(token) {
    return {
        type: LOGIN,
        token: token
    };
}

function logout() {
    return {
        type: LOGOUT
    };
}

export function dispatchLogin(email, password) {
    return dispatch => {
        api.post(`rest-auth/login/`, {
               email,
               password,
           })
           .then(response => {
               if (response.status === 200 && response.data.token) {
                   const token = response.data.token;
                   dispatch(login(token));
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    };
}

export function dispatchLogout() {
    return dispatch => {
        dispatch(logout());
    };
}

