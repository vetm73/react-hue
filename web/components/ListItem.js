import React, { Component, PropTypes } from 'react'
import styles from './ListItem.css';
import Indicator from './Indicator';

export default class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired
    }

    click = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        const {item} = this.props;
        return <li className={styles.container} onClick={this.click}>
            <span className={styles.title}>{item.name}</span><span className={styles.indicator}><Indicator on={item.state.on} /></span>
        </li>
    }
}