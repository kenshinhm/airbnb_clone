import React from 'react';
import Presenter from "./presenter.js";

class RoomByCity extends React.Component {

    state = {
        count: 0,
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       updateCount={this._updateCount}/>
        );
    }

    _updateCount = (count) => {
        this.setState({
            count
        });
    };
}

export default RoomByCity;