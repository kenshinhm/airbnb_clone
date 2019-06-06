import React from 'react';
import {ReactComponent as ArrowDown} from 'svg/arrowDown.svg';
import {ReactComponent as Arrowup} from 'svg/arrowUp.svg';
import {ReactComponent as Minus} from 'svg/minus.svg';
import {ReactComponent as Plus} from 'svg/plus.svg';
import * as PropTypes from "prop-types";
import {DateRangePicker,} from "react-dates";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './_datepicker.css';
import styles from './styles.scss';

class Count extends React.Component {

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
            <div className={styles.count}>
                <button className={styles.countButton}
                        onClick={this._onMinusClick}>
                    <Minus/>
                </button>
                <span>{this.props.count}</span>
                <button className={styles.countButton}
                        onClick={this._onPlusClick}>
                    <Plus/>
                </button>
            </div>
        );
    }
}

class GuestModal extends React.Component {

    render() {
        return (
            <div className={styles.guestModal}>
                <div className={styles.guestRow}>
                    <span>성인</span>
                    <Count name='countAdult'
                           count={this.props.countAdult}
                           updateCount={this.props.updateCount}/>
                </div>
                <div className={styles.guestRow}>
                    <span>어린이(2세~12세)</span>
                    <Count name='countChildren'
                           count={this.props.countChildren}
                           updateCount={this.props.updateCount}/>
                </div>
                <div className={styles.guestRow}>
                    <span>유아(2세 미만)</span>
                    <Count name='countInfant'
                           count={this.props.countInfant}
                           updateCount={this.props.updateCount}/>
                </div>
                <button className={styles.guestButton}
                        onClick={this.props.onClickGuest}>
                    신청하기
                </button>
            </div>
        );
    }
}

GuestModal.propTypes = {
    countAdult: PropTypes.number.isRequired,
    countChildren: PropTypes.number.isRequired,
    countInfant: PropTypes.number.isRequired,
    updateCount: PropTypes.func.isRequired,
    onClickGuest: PropTypes.func.isRequired,
};

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
                            placeholder='인원' onClick={props.onClickGuest}>
                        <span className={styles.placeholder}>{props.stringGuests}</span>
                        {props.guestClicked ? <Arrowup/> : <ArrowDown/>}
                    </button>
                    {props.guestClicked ?
                        <GuestModal countAdult={props.countAdult}
                                    countChildren={props.countChildren}
                                    countInfant={props.countInfant}
                                    updateCount={props.updateCount}
                                    onClickGuest={props.onClickGuest}/>
                        : null}
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
    guestClicked: PropTypes.bool.isRequired,

    stringGuests: PropTypes.string.isRequired,

    countAdult: PropTypes.number.isRequired,
    countChildren: PropTypes.number.isRequired,
    countInfant: PropTypes.number.isRequired,

    onClickGuest: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
    onDatesChange: PropTypes.func.isRequired,
    onFocusChange: PropTypes.func.isRequired,
};

export default Presenter;

