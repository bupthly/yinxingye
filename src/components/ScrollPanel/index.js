import React, { Component, PropTypes } from 'react'

import styles from './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
    }

    handleScroll = e => {
        //如果当前已经正在拉取数据，或者已经拉取完所有数据，则直接返回
        if (this.props.isFetching || this.props.hasEnd) {
            return;
        }
        //如果滚动高度+容器高度 == 内容高度
        const container = this.refs.container;
        if (container.scrollTop + container.offsetHeight > container.scrollHeight - 50) {
            //加载更多
            if (typeof this.props.onScrollFetch === 'function') {
                this.props.onScrollFetch();
            }
        }
    }

    render() {
        return (
            <div ref="container" className={styles.wrapper} onScroll={this.handleScroll}>
                {this.props.children}
                {
                    this.props.hasEnd ? <span className={styles.tip}>没有更多了~</span> : null
                }
            </div>
        )
    }
}

export default Index
