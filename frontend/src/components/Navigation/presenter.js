import React from 'react';
import styles from './styles.scss';
import {ReactComponent as Logo} from 'svg/logo.svg';
import {ReactComponent as Search} from 'svg/search.svg';
import Login from "components/Login";
import * as PropTypes from "prop-types";

const PublicLink = (props) => {
    return (
        <div className={styles.columnLink}>
            <button>
                <div className={styles.link}>호스팅</div>
            </button>
            <button>
                <div className={styles.link}>도움말</div>
            </button>
            <button>
                <div className={styles.link}>회원 가입</div>
            </button>
            <button onClick={props.openLogin}>
                <div className={styles.link}>로그인</div>
            </button>
        </div>
    );
};

const PrivateLink = (props) => {
    return (
        <div className={styles.columnLink}>
            <button>
                <div className={styles.link}>호스팅</div>
            </button>
            <button>
                <div className={styles.link}>도움말</div>
            </button>
            <button onClick={props.dispatchLogout}>
                <div className={styles.link}>로그아웃</div>
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