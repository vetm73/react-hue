import React, { Component, PropTypes } from 'react'
import Container from './Container';
import {getLights,setLight} from './utils/backend';

export default class App extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            lights: false
        }
        this.toggleLight = ::this.toggleLight
    }

    async componentWillMount() {
        const lights = await getLights();
        const lightsArray = Object.keys(lights).map((light) => {
            const temp = lights[light];
            temp.id = light;
            return temp;
        });
        this.setState({ lights: lightsArray });

    }

    async toggleLight(index) {
        const {lights} = this.state;
        const lightId = lights[index].id;
        const changedLight = await setLight(lightId, !this.state.lights[index].state.on);
        changedLight.id = lightId;
        this.setState({ lights: this.state.lights.map((light) => {
                return light.id === lightId ? changedLight : light
            })
        });

    }

    render() {
        return this.state.lights ? <Container lights={this.state.lights} toggleLight={this.toggleLight} /> : <div>Loading....</div>
    }

}
