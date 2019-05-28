import {RESIZE} from "redux/dom/actionTypes.js";

//actions
export function dispatchResize(width) {
    return {
        type: RESIZE,
        width
    };
}

// export function dispatchResize(width) {
//     return dispatch => {
//         dispatch(resize(width));
//     };
// }

