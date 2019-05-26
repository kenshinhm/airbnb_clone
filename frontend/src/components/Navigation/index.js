import Container from './container';
import {dispatchLogout} from "redux/user/actions.js";
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    const {user: {isLoggedIn}} = state;
    return {
        isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLogout: () => {
            dispatch(dispatchLogout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);