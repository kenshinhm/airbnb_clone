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
                       updateApi={this._updateApi}/>
        );
    }

    _updateApi = (data) => {
        this.setState({
            count: data.count
        });
    };
}

export default RoomByCity;