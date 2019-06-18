import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class SearchBar extends React.Component {

    static propTypes = {
        updateGuestCount: PropTypes.func.isRequired,
        updatePrice: PropTypes.func.isRequired,
    };

    state = {

        dayPickerClicked: false,
        dayPickerOn: false,
        startDate: null,
        endDate: null,
        stringDate: "날짜",

        guestPickerClicked: false,
        guestPickerOn: false,
        stringGuests: "인원",
        guestCount: 0,

        pricePickerClicked: false,
        pricePickerOn: false,
        stringPrice: "가격",
        startPrice: 0,
        endPrice: 200000,
    };

    //// DatePicker
    _onClickDayPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        if (this.state.dayPickerClicked) {
            this.setState({
                dayPickerClicked: false,
                dayPickerOn: false,
                stringDate: "날짜",
            });
        } else {
            this.setState({
                dayPickerClicked: true,
                guestPickerClicked: false,
                pricePickerClicked: false,
                stringDate: "날짜",
            });
        }
    };

    _onUpdateDayPicker = (startDate, endDate) => {
        let dayPickerClicked = true;
        let dayPickerOn = false;
        let stringDate = "";

        if (startDate !== null) {
            stringDate = `${startDate.format("M월 D일")} - `;
        }

        if (endDate !== null) {
            dayPickerClicked = false;
            dayPickerOn = true;
            stringDate += `${endDate.format("M월 D일")}`;
        }

        this.setState({
            startDate,
            endDate,
            dayPickerClicked,
            stringDate,
            dayPickerOn,
        });
    };

    //// GuestPicker
    _onClickGuestPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        if (this.state.guestPickerClicked) {
            this.setState({
                guestPickerClicked: false,
            });
            if (this.state.guestCount > 0) {
                this.setState({
                    guestPickerOn: true,
                });
            }
            this.props.updateGuestCount(this.state.guestCount);
        } else {
            this.setState({
                dayPickerClicked: false,
                guestPickerClicked: true,
                guestPickerOn: false,
                pricePickerClicked: false,
                stringGuests: "인원",
                guestCount: 0,
            });
        }
    };

    _onUpdateGuestPicker = ({guestCount, stringGuests}) => {
        this.setState({
            stringGuests,
            guestCount,
        });
    };

    //// PricePicker
    _onClickPricePicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        if (this.state.pricePickerClicked) {
            this.setState({
                pricePickerClicked: false,
            });
            if (this.state.endPrice !== 0) {
                this.setState({
                    pricePickerOn: true,
                });
            }
            this.props.updatePrice(this.state.startPrice, this.state.endPrice);
        } else {
            this.setState({
                dayPickerClicked: false,
                guestPickerClicked: false,
                pricePickerClicked: true,
                pricePickerOn: false,
                stringPrice: "가격",
                startPrice: 0,
                endPrice: 200000,
            });
        }
    };

    _onUpdatePricePicker = (startPrice, endPrice) => {

        let stringPrice = "";

        if (startPrice !== null) {
            stringPrice = `${startPrice}원 - `;
        }

        if (endPrice !== null) {
            stringPrice += `${endPrice}원`;
        }

        this.setState({
            startPrice,
            endPrice,
            stringPrice,
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
                       onClickPricePicker={this._onClickPricePicker}
                       onUpdatePricePicker={this._onUpdatePricePicker}

            />
        );
    }
}

export default SearchBar;