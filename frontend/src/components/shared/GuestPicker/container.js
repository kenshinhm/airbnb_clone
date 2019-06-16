import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class GuestPicker extends React.Component {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
    };

    state = {
        countAdult: 0,
        countChildren: 0,
        countInfant: 0,
        stringGuests: "인원",
    };

    _onUpdate = () => {
        const stringGuests = this.state.stringGuests;
        const guestCount = this.state.countAdult
                           + this.state.countChildren
                           + this.state.countInfant;
        this.props.onUpdate({
            guestCount,
            stringGuests,
        });
    };

    _updateStringGuests = () => {
        const guestNumber = this.state.countAdult + this.state.countChildren;
        const infantNumber = this.state.countInfant;
        let stringGuests = guestNumber ? `게스트 ${guestNumber}명` : ``;
        if (infantNumber) {
            if (stringGuests) {
                stringGuests += `, 유아 ${infantNumber}명`;
            } else {
                stringGuests += `유아 ${infantNumber}명`;
            }
        }
        if (!stringGuests) {
            stringGuests = '인원';
        }

        this.setState({
            ...this.state,
            stringGuests
        }, this._onUpdate);
    };

    _updateCount = (type, count) => {
        this.setState({
            ...this.state,
            [type]: count,
        }, this._updateStringGuests);
    };

    _onClick = evt => {
        evt.preventDefault();
        this.props.onClick();
    };

    render() {
        return (
            <Presenter {...this.state}
                       updateCount={this._updateCount}
                       onClick={this._onClick}/>
        );
    }
}

export default GuestPicker;