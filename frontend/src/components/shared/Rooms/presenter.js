import React from 'react';
import 'components/shared/Rooms/styles.scss';
import styles from "components/shared/Rooms/styles.scss";
import {ReactComponent as Star} from 'svg/star.svg';
import PropTypes from "prop-types";
import withLoading from "components/shared/Loading/loading.js";
import {Link} from "react-router-dom";


const RoomCard = props => {

    const room = props.room;
    const room_photo = room.room_photos[0].photo;

    return (
        <div className={styles.card}>
            <Link to={`room/${room.id}`}>
                <div style={{backgroundImage: `url(${room_photo})`}}
                     className={styles.imgContainer}/>
            </Link>
            <p className={styles.location}>{room.location}</p>
            <p className={styles.title}>{room.name}</p>
            <p className={styles.cost}>1인당 ₩{room.price}</p>
            <p className={styles.rating}><Star className={styles.star}/>{room.rating}</p>
        </div>
    );
};

RoomCard.propTypes = {
    room: PropTypes.shape({
        room_photos: PropTypes.arrayOf(
            PropTypes.shape({
                photo: PropTypes.string.isRequired,
            })
        ),
        location: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.string,
    }).isRequired,
};

const Presenter = props => {

    const rooms = props.rooms || [];

    return (
        <div className={styles.container}>
            {rooms.map(room => (
                    <RoomCard key={room.id}
                              room={room}/>
                )
            )}
        </div>
    );
};


Presenter.propTypes = {
    rooms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default withLoading(Presenter);

