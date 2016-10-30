import React, { Component, PropTypes } from 'react'
import Lamp from './Lamp';
import styles from './Lamps.css';

export default class Lamps extends Component {
    static propTypes = {
        lights: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    render() {
        const {lights} = this.props;
        return <div className={styles.container}>
            {lights.map((light,index) => {
                return <Lamp key={index} title={light.name} on={light.state.on} />
            })}
        </div>
    }
}