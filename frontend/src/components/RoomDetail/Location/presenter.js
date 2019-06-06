import styles from "./styles.scss";
import Map from "components/shared/DaumMap/container.js";
import React from "react";

const Location = ({location_info, lat, lng}) => {
    return (
        <div className={styles.contentLocation}>
            <h1>지역정보</h1>
            <p className={styles.marginTopBottom}>{location_info}</p>
            <div className={styles.map}>
                <Map lat={lat} lng={lng}/>
            </div>
            <p className={styles.marginBottom}>정확한 위치 정보는 예약이 확정된 후 알려드립니다.</p>
        </div>
    );
};

export default Location;