import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation";
import Home from "components/Home";
import {Route, Switch} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>

            </div>
        );
    }
}

export default App;
