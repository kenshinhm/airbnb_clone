import React from 'react';
import styles from './styles.scss';
import {ReactComponent as ArrowDown} from 'svg/arrowDown.svg';
import {ReactComponent as Arrowup} from 'svg/arrowUp.svg';
import {ReactComponent as Minus} from 'svg/minus.svg';
import {ReactComponent as Plus} from 'svg/plus.svg';
import * as PropTypes from "prop-types";

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

const Reservation = props => {
    return (
        <div className={styles.container}>
            <p>특색 있는 숙소와 즐길 거리를 예약하세요.</p>
            <form className={styles.form}>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>목적지</label>
                    <input className={styles.formInput}
                           placeholder='모든 위치'/>
                </div>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>체크인</label>
                    <input className={styles.formInput}
                           placeholder='년/월/일'/>
                </div>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>체크아웃</label>
                    <input className={styles.formInput}
                           placeholder='년/월/일'/>
                </div>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>인원</label>
                    <button className={styles.dropButton}
                            placeholder='인원' onClick={props.onClickGuest}>
                        <span className={styles.placeholder}>{props.stringGuests}</span>
                        {props.guestClicked ? <Arrowup className={styles.arrow}/> :
                            <ArrowDown/>}
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
                           value='검색'>
                    </input>
                </div>
            </form>
        </div>
    );
};

Reservation.propTypes = {
    stringGuests: PropTypes.string.isRequired,
    guestClicked: PropTypes.bool.isRequired,
    countAdult: PropTypes.number.isRequired,
    countChildren: PropTypes.number.isRequired,
    countInfant: PropTypes.number.isRequired,
    onClickGuest: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
};

export default Reservation;

