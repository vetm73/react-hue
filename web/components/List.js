import React, { Component, PropTypes } from 'react'
import ListItem from './ListItem';
import styles from './List.css';

export default class List extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        onClick: PropTypes.func.isRequired
    }

    render() {
        return <ul className={styles.container}>
            {this.props.items.map((item, index) => {
                return <ListItem key={index} item={item} index={index} onClick={this.props.onClick} />
            })}
        </ul>
    }
}