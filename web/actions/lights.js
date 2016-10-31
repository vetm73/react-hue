import * as types from './actionTypes';

function fetchLightsDataRequest() {
    return {
        type: types.FETCH_LIGHTS_DATA_REQUEST
    }
}

function fetchLightsDataSuccess(data) {
    const lightsArray = Object.keys(data).map((light) => {
        const temp = data[light];
        temp.id = light;
        return temp;
    });
    return {
        type: types.FETCH_LIGHTS_DATA_SUCCESS,
        payload: lightsArray
    }
}

function fetchLightsDataFailure(error) {
    return {
        type: types.FETCH_LIGHTS_DATA_FAILURE,
        payload: true
    }
}

export function fetchLightsData() {
    return dispatch => {
        dispatch(fetchLightsDataRequest());
        return fetch('http://localhost:8080/api/lights')
          .then(res => res.json())
          .then(json => dispatch(fetchLightsDataSuccess(json)))
          .catch(error => {
              console.log(error);
              return dispatch(fetchLightsDataFailure(error)) });
    }
}

function toggleLightRequest() {
    return {
        type: types.TOGGLE_LIGHT_REQUEST
    }
}

function toggleLightSuccess(id, data) {
    return {
        type: types.TOGGLE_LIGHT_SUCCESS,
        payload: { id: id, data: data }
    }
}

function toggleLightFailure(error) {
    return {
        type: types.TOGGLE_LIGHT_FAILURE,
        payload: true
    }
}

export function toggleLight(index) {
    return (dispatch, getState) => {
        const lights = getState().lights.lights;
        const currentLight = lights[index];
        const id = currentLight.id;
        const nextState = !currentLight.state.on;
        dispatch(toggleLightRequest());
        return fetch('http://localhost:8080/api/lights/' + id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({on: nextState.toString()})
        })
          .then((res) => res.json())
          .then(data => dispatch(toggleLightSuccess(id, data)))
          .catch((error) => dispatch(toggleLightFailure(error)));
    }
}