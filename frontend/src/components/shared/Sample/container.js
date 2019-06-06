import React from 'react';
import * as PropTypes from "prop-types";
import Sample from "components/sample/presenter.js";

class Container extends React.Component {

    render() {
        return (
            <Sample {...this.props}/>
        );
    }
}

export default Container;