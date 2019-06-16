import React from 'react';
import styles from './styles.scss';
import {ReactComponent as Minus} from "svg/minus.svg";
import {ReactComponent as Plus} from "svg/plus.svg";
import * as PropTypes from "prop-types";

const Presenter = props => (
    <div className={styles.count}>
        <button className={styles.countButton}
                onClick={props.onMinusClick}>
            <Minus/>
        </button>
        <span>{props.count}</span>
        <button className={styles.countButton}
                onClick={props.onPlusClick}>
            <Plus/>
        </button>
    </div>
);

Presenter.propTypes = {
    onMinusClick: PropTypes.func.isRequired,
    onPlusClick: PropTypes.func.isRequired,
};


export default Presenter;
