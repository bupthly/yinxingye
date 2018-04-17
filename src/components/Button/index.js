import React, { Component, PropTypes } from 'react'

import styles from './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = _ => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div className={styles.wrapper} onClick={this.handleClick}>
                {this.props.text}
            </div>
        )
    }
}

export default Index
