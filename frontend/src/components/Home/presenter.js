import React from 'react';
import styles from './styles.scss';
import Recommendation from "components/Recommendation";
import Rooms from "components/Rooms";
import {ReactComponent as ArrowRight} from "svg/arrowRight.svg";
import * as PropTypes from "prop-types";
import Reservation from "components/Reservation";

const RoomContainer = ({title, city, dispatchLoading}) => {
    return (
        <div className={styles.roomContainer}>
            <header className={styles.header}>{title}</header>
            <Rooms city={city} limit={8} dispatchLoading={dispatchLoading}/>
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

    static propTypes = {
        cityList: PropTypes.array,
        renderCity: PropTypes.array,
        dispatchLoading: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // console.log(this.props.cityList);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image}>
                        <Reservation/>
                        <span className={styles.text}>
                            웨스트 레이크 힐스테이트<br/>미국 텍사스 오스틴
                        </span>
                    </div>
                </div>
                <div className={styles.body}>
                    <Recommendation title='추천 여행지'
                                    cityList={this.props.cityList}/>
                    {
                        this.props.renderCity.map((city, index) => (
                            <RoomContainer key={index}
                                           title={`${city}의 숙소`}
                                           city={city}
                                           dispatchLoading={this.props.dispatchLoading}/>
                        ))

                    }
                </div>
            </div>

        );
    }
}

export default App;
