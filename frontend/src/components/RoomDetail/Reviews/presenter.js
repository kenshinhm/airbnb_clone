import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import Review from "./Review/presenter.js";

const Presenter = props => {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {`후기 ${props.reviewCount}개 ${props.rating}`}
            </div>
            <div className={styles.reviewContainer}>
                {props.reviews.map((review, index) =>
                    <Review key={index} review={review}
                            onUserReviewDelete={props.onUserReviewDelete}/>)}
            </div>
            {props.isLoggedIn ?
                <div className={styles.reviewWriteContainer}>
                    <textarea placeholder='소중한 후기를 남겨주세요'
                              value={props.userReview}
                              onChange={props.onUserReviewChange}/>
                    <button onClick={props.onUserReviewSubmit}>쓰기</button>
                </div>
                :
                null
            }
        </div>
    );
};

Presenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onUserReviewChange: PropTypes.func,
    onUserReviewSubmit: PropTypes.func,
    onUserReviewDelete: PropTypes.func,
    reviews: PropTypes.array,
    reviewCount: PropTypes.number,
    userReview: PropTypes.string,
};

export default Presenter;
