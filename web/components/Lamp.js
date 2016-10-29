import React, { Component, PropTypes } from 'react'  
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
        return <div>
            <img src={this.props.on ? lamp_on : lamp_off} alt={this.props.title} />
        </div>
    }  
}