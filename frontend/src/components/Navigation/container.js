import React from 'react';
import Navigation from './presenter';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        dispatchLogout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    state = {
        onLogin: false,
        onSignUp: false,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isLoggedIn) {
            this.setState({
                ...this.state,
                onLogin: false
            });
        }
    }

    render() {
        return (
            <Navigation {...this.props}
                        {...this.state}
                        openLogin={this._openLogin}
                        closeLogin={this._closeLogin}
            />
        );
    }

    _openLogin = () => {
        this.setState({
            ...this.state,
            onLogin: true
        });
    };

    _closeLogin = () => {
        this.setState({
            ...this.state,
            onLogin: false
        });
    };


}

export default Container;