import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from './reducers';

let composable = [ applyMiddleware(thunk) ];
const reducer = combineReducers(reducers);

composable.push(
    devTools({
        name: 'Hue app',
        realtime: false,
    })
);

export default function configureStore() {
    return createStore(reducer,{},compose(...composable));
}