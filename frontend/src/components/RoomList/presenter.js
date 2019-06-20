import React from 'react';
import styles from './styles.scss';
import Rooms from "components/shared/Rooms/container.js";
import * as PropTypes from "prop-types";
import SearchBar from "components/RoomList/SearchBar/container.js";
import trophy from 'img/trophy.png';

const RoomsContainer = props => {

    let ret = [];

    // console.log(props);

    for (let i = 0; i <= props.offset; i++) {
        ret.push(
            <Rooms key={i}
                   city={props.city}
                   guestCount={props.guestCount}
                   startPrice={props.startPrice}
                   endPrice={props.endPrice}
                   limit={props.limit}
                   offset={props.limit * i}
                   dispatchLoading={props.dispatchLoading}
                   updateApi={props.updateApi}
                   width={5}
            />
        );
    }

    return ret;
};


const Presenter = props => {

    return (
        <div className={styles.container}>
            <SearchBar updateGuestCount={props.updateGuestCount}
                       updatePrice={props.updatePrice}/>
            <div className={styles.header}>
                <div className={styles.info}>
                    <img src={trophy} alt='info'/>
                    {
                        `${props.city} 숙소에 대해
                        ${props.total_reviews}개의 게스트 후기가 있으며,
                        평점은 5점 만점에 ${props.average_rating}점, 
                        평균가격은 ￦${props.average_price.toLocaleString()}원 입니다`
                    }
                </div>
                <div className={styles.title}>
                    {`${props.city}, ${props.count}개의 숙소`}
                </div>
            </div>
            <div className={styles.body}>
                {RoomsContainer(props)}
            </div>
        </div>
    );
};

Presenter.propTypes = {
    city: PropTypes.string,
    count: PropTypes.number,
    guestCount: PropTypes.number,
    limit: PropTypes.number,
    offset: PropTypes.number,
    dispatchLoading: PropTypes.func,
    updateApi: PropTypes.func,
    updateGuestCount: PropTypes.func,
    updatePrice: PropTypes.func,
    average_price: PropTypes.number,
    average_rating: PropTypes.number,
    total_reviews: PropTypes.number,
};

export default Presenter;
