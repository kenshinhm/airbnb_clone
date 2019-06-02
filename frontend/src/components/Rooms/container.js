import React from 'react';
import Rooms from 'components/Rooms/presenter.js';
import api from 'api.js';
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        city: PropTypes.string.isRequired,
    };

    state = {
        loading: true,
        rooms: []
    };

    componentDidMount() {

        const params = new URLSearchParams();
        params.append('city', this.props.city);

        api.get(`rooms/`, {params})
           .then(response => {
               if (response.status === 200) {
                   this.setState({
                       rooms: [...response.data],
                       loading: false
                   });
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    }

    render() {
        return (
            <Rooms {...this.state}/>
        );

    }
}

export default Container;