import React from 'react';
import styles from './styles.scss';

export const Loading = () => {
    return (
        <section className={styles.loadingContainer}>
            <ul className={styles.loadingItemContainer}>
                <li className={styles.loadingItem}/>
                <li className={styles.loadingItem}/>
                <li className={styles.loadingItem}/>
            </ul>
        </section>
    );
};
