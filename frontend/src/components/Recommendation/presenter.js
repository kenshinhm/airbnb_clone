import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import {ReactComponent as ArrowLeft} from 'svg/arrowLeft.svg';
import {ReactComponent as ArrowRight} from 'svg/arrowRight.svg';
import classNames from 'classnames';

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
        <React.Fragment>
            <header className={styles.header}>{props.title}</header>
            <div className={styles.container}>
                <button className={styles.arrowLeft} onClick={props.slideLeft}
                        style={props.cityOffset === 0 ? {display: 'none'} : {}}>
                    <ArrowLeft/>
                </button>
                <div className={styles.listContainer}>
                    <ul style={{transform: `translateX(${props.translateX}%)`}}>
                        {
                            props.cityList.map((city, index) => (
                                <li key={index} className={cardStyle}>
                                    <img src={require(`img/${city.name}.webp`)} alt={city.name}/>
                                    {/*<div className={styles.img}/>*/}
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
        </React.Fragment>
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

