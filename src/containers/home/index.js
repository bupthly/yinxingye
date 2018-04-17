/**
 * @file 我的
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'

import Panel from 'components/Panel'
import ScrollPanel from 'components/ScrollPanel'

import URLS from 'constants/URLS'
import {getJSON} from 'common/dataservice'
import styles from './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            question: ''
        }
    }

    componentDidMount() {
        //请求知识详情
        this.getData();
    }

    getData() {
        const {knowledge_id} = this.props.params;
        getJSON(URLS.GET_KNOWLEDGE_DETAIL, {
            knowledge_id
        }, {
            method: 'get'
        }).then(rs => {
            const {answer, question} = rs;
            this.setState({
                answer,
                question
            })
        }).catch(_ => {
        })
    }

    render() {
        const {answer, question} = this.state;
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{question}</h1>
                <p className={styles.content}>{answer}</p>
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
