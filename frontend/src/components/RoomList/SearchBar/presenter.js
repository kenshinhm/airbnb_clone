import React from 'react';
import styles from './styles.scss';
import DayPickerRange from "components/shared/DayPickerRange/container.js";
import GuestPicker from "components/shared/GuestPicker/container.js";
import * as PropTypes from "prop-types";
import PricePicker from "components/shared/PricePicker/container.js";

const buttonStyle = (clicked, on) => {
    if (clicked || on) {
        return ({
            backgroundColor: `#239499`,
            color: 'white',
        });
    } else {
        return {};
    }
};

const Presenter = props => {
    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <button onClick={props.onClickDayPicker}
                        style={buttonStyle(props.dayPickerClicked, props.dayPickerOn)}>
                    {props.stringDate}
                </button>
                <button onClick={props.onClickGuestPicker}
                        style={buttonStyle(props.guestPickerClicked, props.guestPickerOn)}>
                    {props.stringGuests}
                </button>
                <button onClick={props.onClickPricePicker}
                        style={buttonStyle(props.pricePickerClicked, props.pricePickerOn)}>
                    {props.stringPrice}
                </button>
            </div>
            {
                props.dayPickerClicked ?
                    <div className={styles.modal}>
                        <div className={styles.dayPickerModal}>
                            <DayPickerRange onDatesUpdate={props.onUpdateDayPicker}
                                            startDate={props.startDate}
                                            endDate={props.endDate}
                                            numberOfMonths={2}
                                            hideKeyboardShortcutsPanel={true}/>
                        </div>
                    </div>
                    :
                    null
            }
            {
                props.guestPickerClicked ?
                    <div className={styles.modal}>
                        <div className={styles.guestPickerModal}>
                            <GuestPicker onClick={props.onClickGuestPicker}
                                         onUpdate={props.onUpdateGuestPicker}/>
                        </div>
                    </div>
                    :
                    null
            }
            {
                props.pricePickerClicked ?
                    <div className={styles.modal}>
                        <div className={styles.pricePickerModal}>
                            <PricePicker onClick={props.onClickPricePicker}
                                         onUpdate={props.onUpdatePricePicker}/>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
};

Presenter.propTypes = {
    onClickGuestPicker: PropTypes.func,
    onUpdateGuestPicker: PropTypes.func,
    onClickDayPicker: PropTypes.func,
    onUpdateDayPicker: PropTypes.func,
    onClickPricePicker: PropTypes.func,
    onUpdatePricePicker: PropTypes.func,
};

export default Presenter;
