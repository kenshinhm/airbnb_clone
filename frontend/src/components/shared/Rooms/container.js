import React from 'react';
import Presenter from './presenter.js';
import api from 'api.js';
import * as PropTypes from "prop-types";

class Room extends React.Component {

    static propTypes = {
        city: PropTypes.string.isRequired,
        limit: PropTypes.number.isRequired,
        dispatchLoading: PropTypes.func.isRequired,
        updateCount: PropTypes.func.isRequired,
    };

    state = {
        loading: true,
        rooms: [],
    };

    componentDidMount() {

        const params = new URLSearchParams();
        params.append('city', this.props.city);
        params.append('limit', this.props.limit.toString());
        params.append('offset', '0');

        api.get(`rooms/`, {params})
           .then(response => {
               if (response.status === 200) {
                   // console.log(response);
                   this.setState({
                       rooms: [...response.data.results],
                   });
                   this.props.updateCount(response.data.count);
                   setTimeout(() => {
                       this.props.dispatchLoading(false);
                       this.setState({
                           loading: false,
                       });

                   }, 500);
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    }

    render() {
        return (
            <Presenter {...this.state}/>
        );

    }
}

export default Room;