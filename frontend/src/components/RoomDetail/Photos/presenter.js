import React from 'react';
import styles from './styles.scss';
import {wrapUrl} from "shared/utility.js";

const Photos = ({main_photo, sub_photos}) => (
    <div className={styles.container}>
        <div className={styles.mainImage}>
            <img src={wrapUrl(main_photo.photo)}
                 className={styles.img}
                 alt='방'/>
        </div>
        <div className={styles.subImage}>
            {
                sub_photos.map((photo, index) => {
                    return (
                        <div className={styles.subImageWrap} key={index}>
                            <img src={wrapUrl(photo.photo)}
                                 className={styles.img} alt='room'/>
                        </div>
                    );
                })
            }
        </div>
    </div>
);

export default Photos;




