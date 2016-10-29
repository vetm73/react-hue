import React, { Component, PropTypes } from 'react'
import Container from './Container';
import {getLights} from './utils/backend';

export default class App extends Component {
    async componentWillMount() {
        const lights = await getLights();
        console.log(lights);
    }

    render() {
        return <Container />
    }

}
