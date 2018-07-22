/**
 * @file 问答列表页
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Panel from 'components/Panel'
import ScrollPanel from 'components/ScrollPanel'

import URLS from 'constants/URLS'
import {getJSON} from 'common/dataservice'
import util from 'common/util';
import styles from 'styles/less/common.less'
import questionStyles from 'styles/less/question.less'

const PAGE_SIZE = 10;
const CURRENT_TIME = util.getDate();
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false, //是否正在拉取数据
            pageNum: 0,
            list: [],
        }
    }

    componentDidMount() {
        //请求问答列表
        this.getData();
    }

    getData() {
        this.setState({
            isFetching: true
        })

        const {pageNum, list} = this.state;

        getJSON(URLS.GET_QUESTION_LIST, {
            page_num: pageNum,
            page_size: PAGE_SIZE,
            search_key: '',
            quer_dt: CURRENT_TIME
        }, {
            method: 'get'
        }).then(rs => {
            if (rs.result === 'ok') {
                const {question_list} = rs;
                this.setState({
                    list: [...list, ...question_list],
                    isFetching: false,
                    pageNum: pageNum + 1,
                    hasEnd: question_list.length < PAGE_SIZE
                })
            }
        }).catch(_ => {
            this.setState({
                isFetching: false
            })
        })
    }

    //跳转到知识详情页
    gotoDetailPage(question_id) {
        hashHistory.push(`/question/${question_id}`);
    }

    //滑动加载下一页
    getMore = _ => {
        this.getData();
    }

    renderList() {
        const {list} = this.state;

        return list.map((item, index) => {
            const {question_name, question_dt, question_id, question_title, question_content} = item;
            return (
                <Panel key={index} onClick={_ => this.gotoDetailPage(question_id)}>
                    <div className={questionStyles['user-panel']}>
                        <span className={questionStyles['user-icon']}></span>
                        <span className={questionStyles.text}>{question_name}&nbsp;{question_dt}</span>
                    </div>
                    <div className={`${styles.fb} ${styles.mb10} ${questionStyles.title}`}>{question_title}</div>
                    <div className={`${questionStyles.content} ${styles.gray6}`}>{question_content}</div>
                </Panel>
            )
        })
    }

    render() {
        const { isFetching, hasEnd } = this.state;
        return (
            <ScrollPanel
                onScrollFetch={this.getMore}
                isFetching={isFetching}
                hasEnd={hasEnd}
            >
                {this.renderList()}
            </ScrollPanel>
        );
    }
}

const getState = (state) => {
    return state.question ;
};

const selectors = createSelector(
    [getState],
    (state) => {
        return state;
    }
)

export default connect(selectors)(Index);
