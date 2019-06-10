import React from 'react';
import withLoading from "components/shared/Loading/loading.js";
import styles from './styles.scss';
import Reservation from "./Reservation/container.js";
import Photos from "./Photos/presenter.js";
import Header from "./Header/presenter.js";
import Description from "./Description/presenter.js";
import Location from "./Location/presenter.js";
import ReservationStatus from "./ReservationStatus/presenter.js";
import Reviews from "./Reviews/container.js";


const Presenter = props => {

    const room = props.room;
    const main_photo = room.room_photos[0];
    const sub_photos = room.room_photos.slice(1, 5);

    return (
        <div className={styles.container}>
            <div className={styles.photoContainer}>
                <Photos main_photo={main_photo}
                        sub_photos={sub_photos}/>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.column1}>
                    <Header name={room.name}
                            location={room.location}
                            profile_image={room.host.profile_image}
                            username={room.host.username}/>
                    <Description room={room}
                                 onClickInfo={props.onClickInfo}
                                 showInfo={props.showInfo}/>
                    <ReservationStatus onDatesUpdate={props.onDatesUpdate}
                                       startDate={props.startDate}
                                       endDate={props.endDate}/>
                    <Reviews rating={room.rating}
                             reviews={room.reviews}
                             reviewCount={room.review_count}
                             roomId={room.id}
                             getApi={props.getApi}/>
                    <Location location_info={room.location_info}
                              lat={room.lat}
                              lng={room.lng}/>
                </div>
                <div className={styles.column2}>
                    <Reservation sticky={props.sticky}
                                 onDatesUpdate={props.onDatesUpdate}
                                 startDate={props.startDate}
                                 endDate={props.endDate}/>
                </div>
            </div>
        </div>
    );
};

Presenter.propTypes = {};

export default withLoading(Presenter);
