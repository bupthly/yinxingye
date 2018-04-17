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
            <div>
                <div>
                    姓名：{this.state.name}
                </div>
                <div>
                    出生年月：{this.state.birthday}
                </div>
                <div>
                    性别：{this.state.gender}
                </div>
                <div>
                    与患者关系：{this.state.relation}
                </div>
                <div>
                    所在城市：{this.state.city}
                </div>
                <div>
                    手机号：{this.state.telephone}
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
