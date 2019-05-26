import Container from './container';
import {dispatchLogin} from "redux/user/actions.js";
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLogin: (email, password) => {
            dispatch(dispatchLogin(email, password));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);