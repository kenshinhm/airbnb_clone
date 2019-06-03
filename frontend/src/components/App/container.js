import React from 'react';
import App from './presenter';


class Container extends React.Component {

    render() {
        return (
            <App {...this.props}/>
        );
    }
}

export default Container;