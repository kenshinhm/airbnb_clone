import React from 'react';
import Recommendation from './presenter';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        device: PropTypes.string.isRequired,
    };
    state = {
        cityList: [],
        cityOffset: 0,
        translateX: 0,
    };

    componentWillMount() {
        this.state.cityList.push({name: "barcelona", url: "../../img/barcelona.webp"});
        this.state.cityList.push({name: "london", url: "../../img/london.webp"});
        this.state.cityList.push({name: "newyork", url: "../../img/newyork.webp"});
        this.state.cityList.push({name: "paris", url: "../../img/paris.webp"});
        this.state.cityList.push({name: "roma", url: "../../img/roma.webp"});
        this.state.cityList.push({name: "sanfrancisco", url: "../../img/sanfrancisco.webp"});
        this.state.cityList.push({name: "tokyo", url: "../../img/tokyo.webp"});
    }

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