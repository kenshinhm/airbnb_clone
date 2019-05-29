import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation";
import Recommendation from "components/Recommendation";
import Rooms from "components/Rooms";
import {Loading} from "components/Loading/loading.js";

class App extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <div className={styles.nav}>
                    <Navigation/>
                </div>
                <div className={styles.body}>
                    <div className={styles.bodyChild}>
                        <Recommendation title='추천 여행지'/>
                        <Rooms title='서울의 숙소'/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Loading></Loading>
                </div>
            </div>
        );
    }
}

export default App;
