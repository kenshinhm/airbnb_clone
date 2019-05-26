import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.scss';
import {ReactComponent as Close} from 'svg/close.svg';
import {ReactComponent as Google} from 'svg/google.svg';

const Login = props => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <button className={styles.closeButton} onClick={props.closeLogin}>
                        <Close/>
                    </button>
                    <button className={styles.googleButton}>
                        <Google/>
                        <span className={styles.googleFont}>Log in with Google</span>
                    </button>
                    <span className={styles.divider}>or</span>
                </div>
                <form className={styles.form} onSubmit={props.onSubmit}>
                    <input className={styles.input}
                           name='email'
                           placeholder='Email Address'
                           value={props.email}
                           onChange={props.onChange}/>
                    <input className={styles.input}
                           name='password'
                           placeholder='Password'
                           value={props.password}
                           onChange={props.onChange}/>
                    <input className={styles.button}
                           type='submit'
                           value='Log in'/>
                </form>
                <div className={styles.footer}>
                    <span>Don't have an account?</span>
                    <a href='/'>Sign up</a>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    closeLogin: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Login;

