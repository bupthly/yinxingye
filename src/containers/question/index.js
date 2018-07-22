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
import util from 'common/util'
import styles from '../../styles/less/question.less'

const CURRENT_TIME = util.getDate();
const PAGE_SIZE = 10;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerList: [],
            pageNum: 0,
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
        const {pageNum} = this.state;
        getJSON(URLS.GET_QUESTION_ANSWERS, {
            question_id,
            page_num: pageNum,
            page_size: PAGE_SIZE,
            query_dt: CURRENT_TIME
        }, {
            method: 'get'
        }).then(rs => {
            const {answer_list, answer_num, page_num} = rs;
            this.setState({
                answerList: answer_list,
                totalCount: answer_num,
                pageNum: page_num + 1,
                isFetching: false,
                // hasEnd: 
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
                    <div className={styles['user-panel']}>
                        <span className={styles['user-icon']}></span>
                        <span className={styles['text']}>{answer_name}&nbsp;{answer_dt}</span>
                    </div>
                    <div className={styles.content}>{answer_content}</div>
                </Panel>
            )
        })
    }

    render() {
        //从问题列表中获取该问题的问题和内容
        const {totalCount} = this.state;

        return (
            <div className={styles.wrapper}>
                {/* <div>
                    <h1>{question_title}</h1>
                    <p>{question_content}</p>
                </div> */}
                <div>
                    <h1 className={styles['total-answer']}>共有{totalCount}个回答</h1>
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
