import React from 'react';
import styles from './styles.scss';
import Rooms from "components/shared/Rooms/container.js";
import * as PropTypes from "prop-types";
import SearchBar from "components/RoomList/SearchBar/container.js";

const RoomsContainer = props => {

    let ret = [];

    // console.log(props);

    for (let i = 0; i <= props.offset; i++) {
        ret.push(
            <Rooms key={i}
                   city={props.city}
                   guestCount={props.guestCount}
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
            <SearchBar updateGuestCount={props.updateGuestCount}/>
            <div className={styles.title}>
                {`${props.city}, ${props.count}개의 숙소`}
            </div>
            <div className={styles.body}>
                {
                    RoomsContainer(props)
                }
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
};

export default Presenter;
