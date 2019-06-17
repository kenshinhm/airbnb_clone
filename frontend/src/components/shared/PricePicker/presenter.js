import React from 'react';
import styles from './styles.scss';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import './rc-slider.css';
import * as PropTypes from "prop-types";


const Presenter = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {`평균 1박 요금은 ₩${props.avgPrice}입니다`}
            </div>
            <div className={styles.range}>
                <Range
                    min={0}
                    max={200000}
                    step={1000}
                    value={[props.startPrice, props.endPrice]}
                    onChange={props.onChangeRange}
                />
            </div>
            <div className={styles.input}>
                <input name='startPrice'
                       value={`₩ ${props.startPrice}원`}
                       disabled/>
                <span>-</span>
                <input name='endPrice'
                       value={`₩ ${props.endPrice}원`}
                       disabled/>
            </div>
            <div className={styles.button}>
                <button onClick={props.onClick}>
                    적용
                </button>
            </div>

        </div>
    );
};

Presenter.propTypes = {
    onChangeRange: PropTypes.func,
};

export default Presenter;
