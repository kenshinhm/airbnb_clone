import React from 'react';
import PropTypes from "prop-types";
import 'components/Rooms/styles.scss';
import styles from "components/Rooms/styles.scss";
import {ReactComponent as Star} from 'svg/star.svg';
import {ReactComponent as ArrowRight} from 'svg/arrowRight.svg';

const Rooms = props => {

    return (
        <div className={styles.container}>
            <header className={styles.header}>{props.title}</header>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}/>
                    <p className={styles.location}>수영구</p>
                    <p className={styles.title}>[광교]재형이와 현지네 하우스</p>
                    <p className={styles.cost}>1인당 ₩84,451</p>
                    <p className={styles.rating}><Star className={styles.star}/>4.7</p>
                </div>
            </div>
            <footer className={styles.footer}>
                모두 보기(2,000개 이상)
                <span style={{marginLeft: `10px`}}>
                    <ArrowRight/>
                </span>
            </footer>
        </div>
    );
};


Rooms.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Rooms;

