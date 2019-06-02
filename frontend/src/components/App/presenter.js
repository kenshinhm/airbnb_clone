import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation";
import Recommendation from "components/Recommendation";
import Rooms from "components/Rooms";
import {ReactComponent as ArrowRight} from "svg/arrowRight.svg";

const RoomContainer = ({title, city}) => {
    return (
        <div className={styles.roomContainer}>
            <header className={styles.header}>{title}</header>
            <Rooms city={city} limit={8}/>
            <footer className={styles.footer}>
                모두 보기(2,000개 이상)
                <span style={{marginLeft: `10px`}}>
                    <ArrowRight/>
                </span>
            </footer>
        </div>
    );
};

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
                        <RoomContainer title={'서울의 숙소'} city={'서울'}/>
                    </div>
                </div>
                <div className={styles.footer}>
                </div>
            </div>
        );
    }
}

export default App;
