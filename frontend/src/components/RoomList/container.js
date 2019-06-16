import React from 'react';
import Presenter from "./presenter.js";
import {dispatchLoading} from "redux/dom/actions.js";
import {connect} from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLoading: (status) => dispatch(dispatchLoading(status)),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {dom: {loading}} = state;
    return {
        loading,
    };
};

class RoomList extends React.Component {

    state = {
        city: '',
        count: 0,
        limit: 20,
        offset: 0,
    };

    componentWillMount() {
        const {match: {params: {city}}} = this.props;
        this.setState({
            city
        });
        window.addEventListener('scroll', this._scroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._scroll);
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       updateApi={this._updateApi}/>
        );
    }

    _updateApi = (data) => {

        // console.log(data);

        this.setState({
            count: data.count,
        });
        dispatchLoading(false);
    };

    _scroll = () => {

        const element = document.documentElement;

        if (element.scrollHeight - element.scrollTop
            === element.clientHeight && !this.props.loading) {

            this.props.dispatchLoading(true);

            const count = this.state.count;
            const limit = this.state.limit;
            const offset = this.state.offset;

            if ((offset + 1) * limit <= count) {
                // console.log(offset);
                // console.log((offset + 1) * limit);

                this.setState({
                    offset: offset + 1
                });
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);