import React from 'react';
import Presenter from "./presenter.js";
import api from "api.js";

class RoomDetail extends React.Component {

    state = {
        room: {},
        loading: true,
        showInfo: false,
        lastScrollY: 0,
        sticky: false,
        startDate: null,
        endDate: null,
    };

    componentDidMount() {

        window.addEventListener('scroll', this._handleScroll);

        const {match: {params: {id}}} = this.props;

        api.get(`rooms/${id}/`)
           .then(response => {
               if (response.status === 200) {
                   this.setState({
                       room: response.data,
                       loading: false
                   });
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       onClickInfo={this._onClickInfo}
                       onDatesUpdate={this._onDatesUpdate}/>
        );
    }

    _onClickInfo = (evt) => {
        evt.preventDefault();
        this.setState({
            showInfo: !this.state.showInfo
        });
    };

    _handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 655 && this.lastScrollY <= 655) {
            this.setState({
                sticky: true,
            });
        } else if (this.lastScrollY > 655 && currentScroll <= 655) {
            this.setState({
                sticky: false,
            });
        }
        this.lastScrollY = currentScroll;
    };

    _onDatesUpdate = (startDate, endDate) => {
        this.setState({startDate, endDate});
    };
}

export default RoomDetail;