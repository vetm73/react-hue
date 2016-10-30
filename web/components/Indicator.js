import React, { Component, PropTypes } from 'react'
import styles from './Indicator.css';

export default class Indicator extends Component {
    static propTypes = {
        on: PropTypes.bool
    }

    static defaultProps = {
        on: false
    }

    render() {
        const {on} = this.props;
        const fill = on ? 'yellow' : 'white';
        return <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill={fill} />
        </svg>
    }
}