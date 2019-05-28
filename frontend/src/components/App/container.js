import React from 'react';
import App from './presenter';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        dispatchResize: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.addEventListener('resize', this._resize);
    }

    _resize = () => {
        const width = window.outerWidth;
        this.props.dispatchResize(width);
    };

    render() {
        return (
            <App {...this.props}/>
        );
    }
}

export default Container;