import React from 'react';
import {ReactComponent as ArrowDown} from 'svg/arrowDown.svg';
import {ReactComponent as Arrowup} from 'svg/arrowUp.svg';
import * as PropTypes from "prop-types";
import {DateRangePicker,} from "react-dates";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './_datepicker.css';
import styles from './styles.scss';
import GuestPicker from "components/shared/GuestPicker/container.js";


const Presenter = props => {

    const position = props.sticky ? 'fixed' : 'relative';

    return (
        <div className={styles.container}
             style={{position: position}}>
            <p>요금을 확인하려면 날짜를 입력하세요</p>
            <form className={styles.form}>
                <div className={styles.formRow} style={{position: 'relative'}}>
                    <label className={styles.formLabel}>체크인 / 체크아웃</label>
                    <DateRangePicker
                        startDatePlaceholderText={"월/일/년"}
                        endDatePlaceholderText={"월/일/년"}
                        startDate={props.startDate}
                        startDateId="your_unique_start_date_id"
                        endDate={props.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={props.onDatesChange}
                        focusedInput={props.focusedInput}
                        onFocusChange={props.onFocusChange}
                        numberOfMonths={1}
                    />
                </div>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>인원</label>
                    <button className={styles.dropButton}
                            placeholder='인원' onClick={props.onClickGuestPicker}>
                        <span className={styles.placeholder}>{props.stringGuests}</span>
                        {props.guestPickerClicked ? <Arrowup/> : <ArrowDown/>}
                    </button>
                    {
                        props.guestPickerClicked ?
                            <GuestPicker onClick={props.onClickGuestPicker}
                                         onUpdate={props.onUpdateGuestPicker}/>
                            :
                            null
                    }
                </div>
                <div className={styles.formRow}>
                    <input className={styles.submitButton}
                           type='submit'
                           value='예약하기'>
                    </input>
                </div>
            </form>
        </div>
    );
};

Presenter.propTypes = {
    guestPickerClicked: PropTypes.bool.isRequired,
    onClickGuestPicker: PropTypes.func.isRequired,
    onUpdateGuestPicker: PropTypes.func.isRequired,
    onDatesChange: PropTypes.func.isRequired,
    onFocusChange: PropTypes.func.isRequired,
};

export default Presenter;

