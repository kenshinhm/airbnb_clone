// initial state
import {RESIZE} from "redux/dom/actionTypes.js";

const phoneWidth = 510;
const tabletWidth = 850;
const laptopWidth = 1200;

const initialState = {
    width: 0,
    device: 'desktop',
};

// reducer functions
function applyResize(state, action) {
    const {width} = action;
    let device = '';

    if (width >= laptopWidth) {
        device = 'desktop';
    } else if (width >= tabletWidth && width < laptopWidth) {
        device = 'laptop';
    } else if (width >= phoneWidth && width < tabletWidth) {
        device = 'tablet';
    } else if (width <= phoneWidth) {
        device = 'phone';
    }

    return {...state, width, device};
}

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE:
            return applyResize(state, action);
        default:
            return state;
    }
}

export default reducer;