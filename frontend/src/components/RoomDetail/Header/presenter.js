import React from 'react';
import styles from './styles.scss';
import {wrapUrl} from "shared/utility.js";


const Header = ({name, location, profile_image, username}) => (
    <div className={styles.container}>
        <div className={styles.title}>
            <span className={styles.name}>{name}</span>
            <span className={styles.location}>{location}</span>
        </div>
        <div className={styles.profile}>
            <img src={wrapUrl(profile_image)}
                 className={styles.profileImage} alt='host'/>
            <span className={styles.profileUsername}>
                        {username}
                    </span>
        </div>
    </div>
);


export default Header;




