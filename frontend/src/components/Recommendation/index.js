import Container from './container';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    const {dom: {width, device}} = state;
    return {
        width,
        device
    };
};

export default connect(mapStateToProps)(Container);