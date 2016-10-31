import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store';
import Container from './Container';

const store = configureStore();

export default class App extends Component {
    render() {
        return <Provider store={store}><Container /></Provider>
    }

}