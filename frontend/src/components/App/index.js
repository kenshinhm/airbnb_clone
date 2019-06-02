import Container from './container';
import {dispatchResize, dispatchLoading} from "redux/dom/actions.js";
import {connect} from 'react-redux';


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