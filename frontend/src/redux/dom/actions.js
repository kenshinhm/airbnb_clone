import {RESIZE, LOADING} from "redux/dom/actionTypes.js";

//actions
export function dispatchResize(width) {
    return {
        type: RESIZE,
        width
    };
}

export function dispatchLoading(status) {
    return {
        type: LOADING,
        status
    };
}

