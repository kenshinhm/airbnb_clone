import React from 'react';
import styles from './styles.scss';
import DayPickerRange from "components/shared/DayPickerRange/container.js";
import GuestPicker from "components/shared/GuestPicker/container.js";
import * as PropTypes from "prop-types";

const buttonStyle = (clicked) => {
    if (clicked) {
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
                        style={buttonStyle(props.dayPickerClicked)}>
                    {props.stringDate}
                </button>
                <button onClick={props.onClickGuestPicker}
                        style={buttonStyle(props.guestPickerClicked)}>
                    {props.stringGuests}
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
        </div>
    );
};

Presenter.propTypes = {
    onClickGuestPicker: PropTypes.func,
    onUpdateGuestPicker: PropTypes.func,
    onClickDayPicker: PropTypes.func,
    onUpdateDayPicker: PropTypes.func,
};

export default Presenter;
