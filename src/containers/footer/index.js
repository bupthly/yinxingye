/**
 * @file 知识详情页
 */

import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import styles from '../../styles/less/footer.less'

class Index extends React.Component {
    gotoKnowledgeList = _ => {
        hashHistory.push('/knowledgeList');
    }

    gotoQuestionList = _ => {
        hashHistory.push('/questionList');
    }

    render() {
        const {location: {pathname}} = this.props;
        const knowledgeTabActiveClass = pathname === '/' || pathname === '/knowledgeList' ? styles.active : '';
        const questionTabActiveClass = pathname === '/questionList' ? styles.active : '';

        return <div className={styles.container}>
            <div className={styles.item + ' ' + knowledgeTabActiveClass} onClick={this.gotoKnowledgeList}>知识</div>
            <div className={styles.item + ' ' + questionTabActiveClass} onClick={this.gotoQuestionList}>问答</div>
        </div>
    }
}

export default Index