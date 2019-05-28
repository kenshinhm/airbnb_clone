import Container from './container';
import {dispatchResize} from "redux/dom/actions.js";
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchResize: (width) => dispatch(dispatchResize(width))
    };
};

export default connect(null, mapDispatchToProps)(Container);