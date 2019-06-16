import styles from "./styles.scss";
import DayPickerRange from "components/shared/DayPickerRange/container.js";
import React from "react";

const ReservationStatus = props => (
    <div className={styles.contentReservation}>
        <h1>예약 가능 여부</h1>
        <DayPickerRange onDatesUpdate={props.onDatesUpdate}
                        startDate={props.startDate}
                        endDate={props.endDate}
                        numberOfMonths={2}/>
    </div>

);

export default ReservationStatus;