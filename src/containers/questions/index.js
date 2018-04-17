/**
 * @file 问题列表页
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux';

import Panel from 'components/Panel'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [], //问答列表
        }
    }

    componentDidMount() {
        //请求问答列表
        this.getData();
    }

    getData() {

    }

    gotoDetailPage(questionId) {
        alert('123');
    }

    renderList() {
        const {list} = this.state;

        return list.map((item, index) => {
            return (
                <Panel key={index} onClick={questionId => this.gotoDetailPage(questionId)}>
                    
                </Panel>
            )
        })
    }

    render() {
        const { dispatch } = this.props;
        return (
            <div style={{width: '100%', height: '100%'}}>
                {this.renderList()}
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
