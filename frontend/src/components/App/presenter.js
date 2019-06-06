import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation";
import Home from "components/Home";
import {Route, Switch} from "react-router-dom";
import RoomDetail from "components/RoomDetail/container.js";

class App extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/room/:id' component={RoomDetail}/>
                </Switch>

            </div>
        );
    }
}

export default App;
