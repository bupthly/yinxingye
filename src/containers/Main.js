import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Footer from './footer';

class AppComponent extends React.Component {
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
        const {routes, location} = this.props;
        //如果是首页
        const showFooter = location.pathname === '/' || routes[1].showFooter;
        return (
            <div style={{width: '100%', height: '100%'}}>
                {this.props.children}
                {
                    showFooter ? <Footer {...this.props}/> : null
                }
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

const getState = (state) => {
    return state ;
};

const selectors = createSelector(
    [getState],
    (state) => {
        return  state ;
    }
)

export default connect(selectors)(AppComponent);
