import * as types from '../actions/actionTypes';

const initialState = {
    lights: false
};

export default function lights(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_LIGHTS_DATA_SUCCESS:
            return {
                ...state,
                lights: action.payload
            };
            break;
        case types.FETCH_LIGHTS_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }
            break;
        case types.TOGGLE_LIGHT_SUCCESS:
            const updatedLight = action.payload.data;
            updatedLight.id = action.payload.id;
            return {
              ...state,
              lights: state.lights.map((light) => {
                  return light.id === action.payload.id ? updatedLight : light;
              })
            }
            break;
        default:
            return state;
    }
}
