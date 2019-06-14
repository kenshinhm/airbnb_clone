import React from 'react';
import Presenter from './presenter';
import {connect} from "react-redux";


class App extends React.Component {

    render() {
        return (
            <Presenter {...this.props}/>
        );
    }
}

export default connect(null, null)(App);