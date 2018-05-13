/**
 * @file 知识详情页
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

const PAGE_SIZE = 10;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerList: [],
            pageNum: 1,
            isFetching: false
        }
    }

    componentDidMount() {
        //请求答案列表
        this.getData();
    }

    getData() {
        this.setState({
            isFetching: true
        })
        const {question_id} = this.props.params;
        getJSON(URLS.GET_QUESTION_ANSWERS, {
            question_id
        }, {
            method: 'get'
        }).then(rs => {
            const {answer_list, total_count, page_num} = rs;
            this.setState({
                answerList: answer_list,
                totalCount: total_count,
                pageNum: page_num + 1,
                isFetching: false
            })
        }).catch(_ => {
            this.setState({
                isFetching: false
            })
        })
    }

    //渲染答案列表
    renderList() {
        const {answerList} = this.state;

        return answerList.map((item, index) => {
            const {answer_content, answer_dt, answer_name} = item;
            return (
                <Panel key={index}>
                    <div className={`${styles.fb} ${styles.mb10}`}>{answer_name}:{answer_dt}</div>
                    <div className={styles.gray6}>{answer_content}</div>
                </Panel>
            )
        })
    }

    render() {
        //从问题列表中获取该问题的问题和内容
        const {list, params: {question_id}} = this.props;
        const question = list.filter(item => item.question_id === question_id) || [];
        const {question_title, question_content, question_dt} = question;

        return (
            <div className={styles.wrapper}>
                <div>
                    <h1>{question_title}</h1>
                    <p>{question_content}</p>
                </div>
                <div>
                    <h1>共用1条回答</h1>
                    <div className={styles.wrapper}>
                        {this.renderList()}
                    </div>
                </div>
            </div>
        );
    }
}

const getState = (state) => {
    return state.question;
};

const selectors = createSelector(
    [getState],
    (state) => {
        return state;
    }
)

export default connect(selectors)(Index);
