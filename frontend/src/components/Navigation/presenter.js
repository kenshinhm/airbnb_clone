import React from 'react';
import styles from './styles.scss';
import {ReactComponent as Logo} from 'svg/logo.svg';
import {ReactComponent as Search} from 'svg/search.svg';
import PropTypes from "prop-types";
import Login from "components/Login";

const PublicLink = (props) => {
    return (
        <div className={styles.columnLink}>
            <button>
                <div className={styles.link}>Become a host</div>
            </button>
            <button>
                <div className={styles.link}>Help</div>
            </button>
            <button>
                <div className={styles.link}>Sign up</div>
            </button>
            <button onClick={props.openLogin}>
                <div className={styles.link}>Log in</div>
            </button>
        </div>
    );
};

const PrivateLink = (props) => {
    return (
        <div className={styles.columnLink}>
            <button>
                <div className={styles.link}>Become a host</div>
            </button>
            <button>
                <div className={styles.link}>Help</div>
            </button>
            <button onClick={props.dispatchLogout}>
                <div className={styles.link}>Logout</div>
            </button>
        </div>
    );
};

const Navigation = (props) => (
    <div className={styles.container}>
        <div className={styles.navigation}>
            <div className={styles.columnLogo}>
                <Logo className={styles.logo}/>
            </div>
            <div className={styles.columnSearch}>
                <div className={styles.searchBox}>
                    <div className={styles.searchInner}>
                        <Search/>
                        <input className={styles.searchInput}
                               placeholder={`Try "Seoul"`}/>
                    </div>
                </div>
            </div>
            {props.isLoggedIn ? <PrivateLink {...props}/> : <PublicLink {...props}/>}
            {props.onLogin && <Login closeLogin={props.closeLogin}/>}
        </div>
        <div className={styles.image}>
            <span className={styles.text}>
                웨스트 레이크 힐스테이트
                <br/>미국 텍사스 오스틴
            </span>
        </div>
    </div>
);

Navigation.propTypes = {
    onLogin: PropTypes.bool.isRequired,
    onSignUp: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    openLogin: PropTypes.func.isRequired,
    closeLogin: PropTypes.func.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
};

export default Navigation;