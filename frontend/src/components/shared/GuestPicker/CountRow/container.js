import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class CountRow extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        updateCount: PropTypes.func.isRequired,
    };

    _onPlusClick = (evt) => {
        evt.preventDefault();
        const count = this.props.count + 1;
        this.props.updateCount(this.props.name, count);
    };

    _onMinusClick = (evt) => {
        evt.preventDefault();
        const count = Math.max(0, this.props.count - 1);
        this.props.updateCount(this.props.name, count);
    };

    render() {
        return (
            <Presenter {...this.props}
                       onPlusClick={this._onPlusClick}
                       onMinusClick={this._onMinusClick}/>
        );
    }
}

export default CountRow;