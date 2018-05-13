/**
 * @file 个人信息页
 */

import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'

import Panel from 'components/Panel'
import ScrollPanel from 'components/ScrollPanel'
import Button from 'components/Button'

import URLS from 'constants/URLS'
import {getJSON} from 'common/dataservice'

import styles from './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        getJSON(URLS.GET_PATIENT_INFO, {

        }).then(rs => {
            const {patient_list} = rs;
            if (patient_list.length) {
                this.setState({
                    ...patient_list[0]
                })
            }
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        姓名
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.name}
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        出生年月
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.birthday}
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        性别
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.gender}
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        与患者关系
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.relation}
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        所在城市
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.city}
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles['left-part']}>
                        手机号
                    </div>
                    <div className={styles['right-part']}>
                        {this.state.telephone}
                    </div>
                </div>
                <Button text="保存"/>
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
