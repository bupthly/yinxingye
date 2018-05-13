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
import {GET_QUESTION_LIST_REQUESTED} from 'constants/question'
import styles from 'styles/less/common.less'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false, //是否正在拉取数据
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

        const {dispatch, pageNum} = this.props;
        dispatch({
            type: GET_QUESTION_LIST_REQUESTED,
            payload: {
                pageNum,
                callback: _ => {
                    this.setState({
                        isFetching: false
                    })
                }
            }
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
        const {list} = this.props;

        return list.map((item, index) => {
            const {question_id, question_title, question_content} = item;
            return (
                <Panel key={index} onClick={_ => this.gotoDetailPage(question_id)}>
                    <div className={`${styles.fb} ${styles.mb10}`}>{question_title}</div>
                    <div className={styles.gray6}>{question_content}</div>
                </Panel>
            )
        })
    }

    render() {
        const { isFetching } = this.state;
        const { hasEnd } = this.props;
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
