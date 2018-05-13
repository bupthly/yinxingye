/**
 * @file 新增问答页
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import URLS from 'constants/URLS'
import {getJSON} from 'common/dataservice'
import styles from './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }

    handleTitleChange = e => {
        const title = e.target.value.trim();
        this.setState({
            title
        });
    }

    handleContentChange = e => {
        const content = e.target.value.trim();
        this.setState({
            content
        });
    }

    addQuestion = _ => {
        const {content, title} = this.state;
        getJSON(URLS.QUESTION_ADD, {
            content,
            title
        }).then(rs => {
            if (rs.result === 'ok') {
                //成功
                alert('添加成功');
            }
        })
    }

    render() {
        const {title, content} = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.panel}>
                    <h1 className={styles.title}>请写下你的问题</h1>
                    <textarea name="title" className={styles.textarea} onChange={this.handleTitleChange} value={title}></textarea>
                </div>
                <div className={styles.panel}>
                    <h1 className={styles.title}>请填写问题相关描述信息（选填）</h1>
                    <textarea name="content" className={styles.textarea} onChange={this.handleContentChange} value={content}></textarea>
                </div>
                <div className={styles.btn} onClick={this.addQuestion}>提交</div>
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
        return state;
    }
)

export default connect(selectors)(Index);
