/**
 * @file 知识列表页
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'

import Panel from 'components/Panel'
import ScrollPanel from 'components/ScrollPanel'

import URLS from 'constants/URLS'
import {getJSON} from 'common/dataservice'
import styles from 'styles/less/common.less'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [], //问答列表
            pageNum: 1,
            isFetching: false, //是否正在拉取数据
            hasEnd: false
        }
    }

    componentDidMount() {
        //请求知识列表
        this.getData();
    }

    getData() {
        this.setState({
            isFetching: true
        })

        const {pageNum} = this.state;
        getJSON(URLS.GET_KNOWLEDGE_LIST, {
            pageNum
        }, {
            method: 'get'
        }).then(rs => {
            const {knowledge_list} = rs;
            const {pageNum, list} = this.state;
            this.setState({
                list: [...list, ...knowledge_list],
                isFetching: false,
                pageNum: pageNum + 1,
                hasEnd: knowledge_list.length < 10
            })
        }).catch(_ => {
            this.setState({
                isFetching: false
            })
        })
    }

    //跳转到知识详情页
    gotoDetailPage(knowledge_id) {
        hashHistory.push(`/knowledge/${knowledge_id}`);
    }

    //滑动加载下一页
    getMore = _ => {
        this.getData();
    }

    renderList() {
        const {list} = this.state;

        return list.map((item, index) => {
            const {knowledge_id, question, answer} = item;
            return (
                <Panel key={index} onClick={_ => this.gotoDetailPage(knowledge_id)}>
                    <div className={`${styles.fb} ${styles.mb10}`}>{question}</div>
                    <div className={styles.gray6}>{answer}</div>
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
    return state ;
};

const selectors = createSelector(
    [getState],
    (state) => {
        return  state ;
    }
)

export default connect(selectors)(Index);
