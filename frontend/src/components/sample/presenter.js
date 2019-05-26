import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';

const Sample = props => "hello";

Sample.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default Sample;

