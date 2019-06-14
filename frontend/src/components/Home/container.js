import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";
import {dispatchLoading, dispatchResize} from "redux/dom/actions.js";
import {connect} from "react-redux";


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchResize: (width) => dispatch(dispatchResize(width)),
        dispatchLoading: (status) => dispatch(dispatchLoading(status)),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {dom: {loading}} = state;
    return {
        loading,
    };
};


class Home extends React.Component {

    static propTypes = {
        dispatchResize: PropTypes.func.isRequired,
        dispatchLoading: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    state = {
        renderCity: [],
        nextCityIndex: 0,
        cityList: ['서울',
                   '부산',
                   '대전',
                   '인천',
                   '거제',
                   '광주',
                   '속초',
                   '수원',
                   '울산',]
    };

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        window.addEventListener('scroll', this._scroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
        window.removeEventListener('scroll', this._scroll);
    }

    _resize = () => {
        const width = window.outerWidth;
        this.props.dispatchResize(width);
    };

    _scroll = () => {

        const element = document.documentElement;

        if (element.scrollHeight - element.scrollTop
            === element.clientHeight && !this.props.loading) {

            let nextCityIndex = this.state.nextCityIndex;

            if (nextCityIndex < this.state.cityList.length) {

                this.props.dispatchLoading(true);

                const nextCity = this.state.cityList[nextCityIndex];
                let renderCity = this.state.renderCity;
                renderCity.push(nextCity);

                this.setState({renderCity});

                nextCityIndex = Math.min(this.state.nextCityIndex + 1,
                    this.state.cityList.length);
                this.setState({nextCityIndex});
            }
        }
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);