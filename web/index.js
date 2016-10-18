import './resources/reset.css'
import './resources/app.css'

if (__DEV__) {
    // Chrome has a bug in its fetch implementation that does not show the request body
    if ( window.chrome ) {
        window.fetch = undefined
    }
}
require('whatwg-fetch')

import React from 'react'
import ReactDOM from 'react-dom'
// import HashHistory from 'react-router/lib/HashHistory'

import App from './App'

ReactDOM.render(<App />, document.getElementById('app'));
