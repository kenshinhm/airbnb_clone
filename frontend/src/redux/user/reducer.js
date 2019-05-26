// initial state
import {LOGIN, LOGOUT} from "redux/user/actionTypes.js";

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token")
};

// reducer functions
function applyLogin(state, action) {
    const {token} = action;
    localStorage.setItem('token', token);
    return {...state, isLoggedIn: true, token};
}

function applyLogout(state) {
    localStorage.removeItem('token');
    return {...state, isLoggedIn: false, token: ""};
}

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return applyLogin(state, action);
        case LOGOUT:
            return applyLogout(state);
        default:
            return state;
    }
}

export default reducer;