import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import {ReactComponent as ArrowLeft} from 'svg/arrowLeft.svg';
import {ReactComponent as ArrowRight} from 'svg/arrowRight.svg';
import classNames from 'classnames';
import seoul from 'img/seoul.jpg';
import busan from 'img/busan.jpg';
import daejon from 'img/daejon.jpg';
import incheon from 'img/incheon.jpg';
import keoje from 'img/keoje.jpg';
import kwangju from 'img/kwangju.jpg';
import sokcho from 'img/sokcho.jpg';
import suwon from 'img/suwon.jpg';
import ulsan from 'img/ulsan.jpg';

const cityList = {
    서울: seoul,
    부산: busan,
    대전: daejon,
    인천: incheon,
    거제: keoje,
    광주: kwangju,
    속초: sokcho,
    수원: suwon,
    울산: ulsan,
};

const _getCardStyle = (device) => {

    if (device === 'desktop') {
        return {
            cardStyle: classNames(styles.desktop),
            cardNum: 5,
        };
    } else if (device === 'laptop') {
        return {
            cardStyle: classNames(styles.laptop),
            cardNum: 3,
        };
    } else if (device === 'tablet') {
        return {
            cardStyle: classNames(styles.tablet),
            cardNum: 2,
        };
    } else if (device === 'phone') {
        return {
            cardStyle: classNames(styles.phone),
            cardNum: 1,
        };
    }
};

const Recommendation = props => {

    const {cardStyle, cardNum} = _getCardStyle(props.device);

    return (
        <div className={styles.container}>
            <header className={styles.header}>{props.title}</header>
            <div className={styles.cardContainer}>
                <button className={styles.arrowLeft} onClick={props.slideLeft}
                        style={props.cityOffset === 0 ? {display: 'none'} : {}}>
                    <ArrowLeft/>
                </button>
                <div className={styles.listContainer}>
                    <ul style={{transform: `translateX(${props.translateX}%)`}}>
                        {
                            props.cityList.map((city, index) => (
                                <li key={index} className={cardStyle}>
                                    <div style={{backgroundImage: `url(${cityList[city]})`}}
                                         className={styles.img}>
                                        <div className={styles.text}>
                                            <p>{city}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button className={styles.arrowRight} onClick={props.slideRight}
                        style={props.cityOffset + cardNum === props.cityList.length ? {display: 'none'} : {}}>
                    <ArrowRight/>
                </button>
            </div>
        </div>
    );
};

Recommendation.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    device: PropTypes.string.isRequired,
    cityList: PropTypes.array.isRequired,
    cityOffset: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    slideLeft: PropTypes.func.isRequired,
    slideRight: PropTypes.func.isRequired,
};

export default Recommendation;

