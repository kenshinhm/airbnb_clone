import React from 'react';
import Presenter from "./presenter.js";
import {connect} from "react-redux";
import api from "api.js";
import * as PropTypes from "prop-types";


const mapStateToProps = (state, ownProps) => {
    const {user: {isLoggedIn}} = state;
    return {
        isLoggedIn,
    };
};


class Reviews extends React.Component {

    static propTypes = {
        isLoggedIn: PropTypes.bool,
        rating: PropTypes.string,
        reviews: PropTypes.array,
        reviewCount: PropTypes.number,
        roomId: PropTypes.number,
        getApi: PropTypes.func,
    };

    state = {
        userReview: '',
        userRating: '',
    };

    render() {

        return (
            <Presenter {...this.props}
                       {...this.state}
                       onUserReviewChange={this._onUserReviewChange}
                       onUserReviewSubmit={this._onUserReviewSubmit}
                       onUserReviewDelete={this._onUserReviewDelete}
                       onUserRatingChange={this._onUserRatingChange}/>
        );
    }

    _onUserReviewChange = evt => {

        const value = evt.target.value;

        this.setState({
            userReview: value,
        });
    };

    _onUserRatingChange = evt => {

        const value = evt.target.value;

        this.setState({
            userRating: value,
        });
    };

    _onUserReviewSubmit = (evt) => {

        evt.preventDefault();
        const roomId = this.props.roomId;

        const data = JSON.stringify({
            message: this.state.userReview,
            rating: this.state.userRating,
        });

        api.post(`rooms/${roomId}/reviews/`, data)
           .then(response => {
               // console.log(response);
               if (response.status === 201) {
                   this.props.getApi();
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    };

    _onUserReviewDelete = reviewId => {

        const roomId = this.props.roomId;

        api.delete(`rooms/${roomId}/reviews/${reviewId}`)
           .then(response => {
               if (response.status === 204) {
                   this.props.getApi();
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    };

}

export default connect(mapStateToProps, null)(Reviews);