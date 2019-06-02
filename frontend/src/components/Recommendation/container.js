import React from 'react';
import Recommendation from './presenter';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        device: PropTypes.string.isRequired,
        cityList: PropTypes.array,
    };

    state = {
        cityOffset: 0,
        translateX: 0,
    };

    render() {
        return (
            <Recommendation {...this.props}
                            {...this.state}
                            slideLeft={this._slideLeft}
                            slideRight={this._slideRight}/>
        );
    }

    _slideLeft = () => {
        const {device} = this.props;
        let translateX = 0;
        if (device === 'desktop') {
            translateX = 20;
        } else if (device === 'laptop') {
            translateX = 33.4;
        } else if (device === 'tablet') {
            translateX = 50;
        } else if (device === 'phone') {
            translateX = 100;
        }

        this.setState({
            ...this.state,
            translateX: this.state.translateX + translateX,
            cityOffset: this.state.cityOffset - 1
        });
    };

    _slideRight = () => {
        const {device} = this.props;
        let translateX = 0;
        if (device === 'desktop') {
            translateX = 20;
        } else if (device === 'laptop') {
            translateX = 33.4;
        } else if (device === 'tablet') {
            translateX = 50;
        } else if (device === 'phone') {
            translateX = 100;
        }

        this.setState({
            ...this.state,
            translateX: this.state.translateX - translateX,
            cityOffset: this.state.cityOffset + 1
        });
    };
}

export default Container;