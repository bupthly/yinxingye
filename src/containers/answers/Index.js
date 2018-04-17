import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
      
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount(){
    }

    render() {
        const { dispatch } = this.props;
        return (
            <div style={{width: '100%', height: '100%'}}>
                {this.props.children}
            </div>
        );
    }
}

const getState = (state) => {
    return state ;
};

const selectors = createSelector(
    [getState],
    (state) => {
        return  state ;
    }
)

export default connect(selectors)(Index);
