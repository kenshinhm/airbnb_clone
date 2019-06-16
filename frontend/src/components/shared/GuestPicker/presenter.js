import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import CountRow from "./CountRow/container.js";

class Presenter extends React.Component {

    render() {
        return (
            <div className={styles.guestModal}>
                <div className={styles.guestRow}>
                    <span>성인</span>
                    <CountRow name='countAdult'
                              count={this.props.countAdult}
                              updateCount={this.props.updateCount}/>
                </div>
                <div className={styles.guestRow}>
                    <span>어린이(2세~12세)</span>
                    <CountRow name='countChildren'
                              count={this.props.countChildren}
                              updateCount={this.props.updateCount}/>
                </div>
                <div className={styles.guestRow}>
                    <span>유아(2세 미만)</span>
                    <CountRow name='countInfant'
                              count={this.props.countInfant}
                              updateCount={this.props.updateCount}/>
                </div>
                <button className={styles.guestButton}
                        onClick={this.props.onClick}>
                    신청하기
                </button>
            </div>
        );
    }
}

Presenter.propTypes = {
    countAdult: PropTypes.number.isRequired,
    countChildren: PropTypes.number.isRequired,
    countInfant: PropTypes.number.isRequired,
    updateCount: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Presenter;
