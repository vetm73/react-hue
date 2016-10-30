import React, { Component, PropTypes } from 'react'  
import styles from './Container.css';
import List from './components/List';
import Lamps from './components/Lamps';


export default class Container extends Component { 
    static propTypes = {
        lights: PropTypes.arrayOf(PropTypes.object).isRequired,
        toggleLight: PropTypes.func.isRequired
    }

    render() {
        const {lights} = this.props;
        return <div className={styles.container}>
            <div className={styles.leftPane}>
                <List items={lights} onClick={this.props.toggleLight} />
            </div>
            <div className={styles.rightPane}>
                <Lamps lights={lights} />
            </div>
        </div>
    }  
}