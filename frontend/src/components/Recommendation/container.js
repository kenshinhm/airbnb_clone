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
        this.state.cityList.push({name: "서울"});
        this.state.cityList.push({name: "부산"});
        this.state.cityList.push({name: "대전"});
        this.state.cityList.push({name: "인천"});
        this.state.cityList.push({name: "거제"});
        this.state.cityList.push({name: "광주"});
        this.state.cityList.push({name: "속초"});
        this.state.cityList.push({name: "수원"});
        this.state.cityList.push({name: "울산"});
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