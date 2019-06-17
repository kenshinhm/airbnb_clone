import React from 'react';
import Presenter from './presenter.js';
import api from 'api.js';
import * as PropTypes from "prop-types";

class Room extends React.Component {

    static propTypes = {
        city: PropTypes.string.isRequired,
        guestCount: PropTypes.number,
        limit: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        dispatchLoading: PropTypes.func.isRequired,
        updateApi: PropTypes.func,
        width: PropTypes.number,
    };

    static defaultProps = {
        offset: 0,
        width: 4,
        guestCount: 0,
    };

    state = {
        loading: true,
        rooms: [],
    };

    componentDidMount() {

        const params = new URLSearchParams();
        params.append('city', this.props.city);
        params.append('capacity', this.props.guestCount.toString());
        params.append('limit', this.props.limit.toString());
        params.append('offset', this.props.offset.toString());

        api.get(`rooms/`, {params})
           .then(response => {
               if (response.status === 200) {
                   // console.log(response);
                   this.setState({
                       rooms: this.state.rooms.concat(response.data.results),
                   });

                   if (this.props.updateApi) {
                       this.props.updateApi(response.data);
                   }

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
            <Presenter {...this.state}
                       {...this.props}/>
        );

    }
}

export default Room;