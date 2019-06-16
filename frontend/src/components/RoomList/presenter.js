import React from 'react';
import styles from './styles.scss';
import Rooms from "components/shared/Rooms/container.js";
import * as PropTypes from "prop-types";

const RoomsContainer = props => {

    let ret = [];

    for (let i = 0; i <= props.offset; i++) {
        ret.push(
            <Rooms key={i}
                   city={props.city}
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
            <div className={styles.title}>
                {`${props.city}, ${props.count}개의 숙소`}
            </div>
            {
                RoomsContainer(props)
            }
        </div>
    );
};

Presenter.propTypes = {
    city: PropTypes.string,
    count: PropTypes.number,
    limit: PropTypes.number,
    offset: PropTypes.number,
    dispatchLoading: PropTypes.func,
    updateApi: PropTypes.func,
};

export default Presenter;
