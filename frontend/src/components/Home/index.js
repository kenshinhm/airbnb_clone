import Container from './container';
import {connect} from 'react-redux';
import {dispatchLoading, dispatchResize} from "redux/dom/actions.js";


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchResize: (width) => dispatch(dispatchResize(width)),
        dispatchLoading: (status) => dispatch(dispatchLoading(status)),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {dom: {loading}} = state;
    return {
        loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);