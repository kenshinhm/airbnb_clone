import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation";
import Home from "components/Home/container.js";
import {Route, Switch} from "react-router-dom";
import RoomDetail from "components/RoomDetail/container.js";
import RoomList from "components/RoomList/container.js";

class Presenter extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/room/:id' component={RoomDetail}/>
                    <Route path='/:city/rooms' component={RoomList}/>
                </Switch>

            </div>
        );
    }
}

export default Presenter;
