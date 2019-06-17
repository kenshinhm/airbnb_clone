import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class PricePicker extends React.Component {

    static propTypes = {
        onClick: PropTypes.func,
        onUpdate: PropTypes.func,
    };

    state = {
        startPrice: 0,
        endPrice: 200000,
        avgPrice: 100000,
    };

    _onChangeRange = ([startPrice, endPrice]) => {
        this.setState({
            startPrice,
            endPrice,
        });
        this.props.onUpdate(startPrice, endPrice);
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       onChangeRange={this._onChangeRange}/>
        );
    }
}

export default PricePicker;