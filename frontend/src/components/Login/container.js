import React from 'react';
import Login from './presenter';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        dispatchLogin: PropTypes.func.isRequired,
    };

    state = {
        email: "",
        password: ""
    };

    render() {
        return (
            <Login {...this.props}
                   {...this.state}
                   onChange={this._onChange}
                   onSubmit={this._onSubmit}
            />
        );
    }

    _onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    _onSubmit = (evt) => {
        evt.preventDefault();
        const {email, password} = this.state;
        this.props.dispatchLogin(email, password);
    };
}

export default Container;