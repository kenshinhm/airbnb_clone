import React from 'react';
import styles from 'components/shared/Loading/styles.scss';

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

const withLoading = WrappedComponent => {

    return (props => {
        const {loading, ...rest} = props;
        if (loading) {
            return <Loading/>;
        } else {
            return <WrappedComponent {...rest}/>;
        }
    });
};

export default withLoading;
