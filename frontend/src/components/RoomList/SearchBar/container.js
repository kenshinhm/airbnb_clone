import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class SearchBar extends React.Component {

    static propTypes = {
        updateGuestCount: PropTypes.func.isRequired,
    };

    state = {

        guestPickerClicked: false,
        stringGuests: "인원",
        guestCount: 0,

        dayPickerClicked: false,
        startDate: null,
        endDate: null,
        stringDate: "날짜",
    };

    _onClickGuestPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        if (this.state.guestPickerClicked) {
            this.setState({
                guestPickerClicked: !this.state.guestPickerClicked,
            });
            this.props.updateGuestCount(this.state.guestCount);
        } else {
            this.setState({
                guestPickerClicked: !this.state.guestPickerClicked,
                stringGuests: "인원",
                guestCount: 0,
            });
        }
    };

    _onClickDayPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        this.setState({
            dayPickerClicked: !this.state.dayPickerClicked,
            stringDate: "날짜",
        });
    };

    _onUpdateGuestPicker = ({guestCount, stringGuests}) => {
        this.setState({
            stringGuests,
            guestCount,
        });
    };

    _onUpdateDayPicker = (startDate, endDate) => {
        let dayPickerClicked = true;
        let stringDate = "";

        if (startDate !== null) {
            stringDate = `${startDate.format("M월 D일")} - `;
        }

        if (endDate !== null) {
            dayPickerClicked = false;
            stringDate += `${endDate.format("M월 D일")}`;
        }

        this.setState({
            startDate,
            endDate,
            dayPickerClicked,
            stringDate,
        });
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       onClickGuestPicker={this._onClickGuestPicker}
                       onUpdateGuestPicker={this._onUpdateGuestPicker}
                       onClickDayPicker={this._onClickDayPicker}
                       onUpdateDayPicker={this._onUpdateDayPicker}
            />
        );
    }
}

export default SearchBar;