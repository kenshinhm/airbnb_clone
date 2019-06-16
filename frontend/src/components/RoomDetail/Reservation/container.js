import React from 'react';
import Presenter from './presenter';

class Reservation extends React.Component {

    state = {
        guestClicked: false,

        stringGuests: "인원",
        guestCount: 0,

        startDate: null,
        endDate: null,
        focusedInput: null,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.startDate) {
            this.setState({
                startDate: nextProps.startDate
            });
        }
        if (nextProps.endDate) {
            this.setState({
                endDate: nextProps.endDate
            });
        }
    }

    render() {

        return (
            <Presenter {...this.props}
                       {...this.state}
                       onClickGuestPicker={this._onClickGuestPicker}
                       onUpdateGuestPicker={this._onUpdateGuestPicker}
                       updateCount={this._updateCount}
                       onDatesChange={this._onDatesChange}
                       onFocusChange={this._onFocusChange}/>
        );
    }

    _onClickGuestPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        this.setState({
            guestClicked: !this.state.guestClicked,
        });
    };

    _onUpdateGuestPicker = ({guestCount, stringGuests}) => {
        this.setState({
            stringGuests,
            guestCount,
        });
    };

    _onDatesChange = ({startDate, endDate}) => {
        this.setState({
            startDate,
            endDate
        });
        this.props.onDatesUpdate(startDate, endDate);
    };

    _onFocusChange = focusedInput => {
        this.setState({focusedInput});
    };
}

export default Reservation;