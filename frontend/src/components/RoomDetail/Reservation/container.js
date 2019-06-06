import React from 'react';
import Presenter from './presenter';

class Reservation extends React.Component {

    state = {
        guestClicked: false,

        stringGuests: "인원",

        countAdult: 0,
        countChildren: 0,
        countInfant: 0,

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
                       onClickGuest={this._onClickGuest}
                       updateCount={this._updateCount}
                       onDatesChange={this._onDatesChange}
                       onFocusChange={this._onFocusChange}/>
        );
    }

    _onClickGuest = evt => {
        evt.preventDefault();
        this.setState({
            ...this.state,
            guestClicked: !this.state.guestClicked,
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
        });
    };

    _updateCount = (type, count) => {
        this.setState({
            ...this.state,
            [type]: count,
        }, this._updateStringGuests);
    };
}

export default Reservation;