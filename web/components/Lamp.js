import React, { Component, PropTypes } from 'react'  
import styles from './Lamp.css';
import lamp_on from '../resources/images/lamp_on.png';
import lamp_off from '../resources/images/lamp_off.png';

export default class Lamp extends Component { 
    static propTypes = {
        on: PropTypes.bool,
        title: PropTypes.string.isRequired
    }

    static defaultProps = {
        on: false
    }

    render() { 
        const {on,title} = this.props;
        return <div className={styles.container}>
            <img src={on ? lamp_on : lamp_off} alt={title} />
            <div className={styles.title}>{title}</div>
        </div>
    }  
}