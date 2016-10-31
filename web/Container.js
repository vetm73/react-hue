import React, { Component, PropTypes } from 'react'  
import {connect} from 'react-redux';
import {fetchLightsData,toggleLight} from './actions/lights';
import styles from './Container.css';
import List from './components/List';
import Lamps from './components/Lamps';


@connect(
  (state,props) => ({
      lights: state.lights.lights
  }),
  (dispatch, props) => ({
      fetchLightsData: () => dispatch(fetchLightsData()),
      toggleLight: (id) => dispatch(toggleLight(id))
  })
)
export default class Container extends Component { 
    static propTypes = {
        lights: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]).isRequired,
        fetchLightsData: PropTypes.func.isRequired,
        toggleLight: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.fetchLightsData();
    }

    render() {
        const {lights} = this.props;
        return !lights ? <div>Loading</div> : <div className={styles.container}>
            <div className={styles.leftPane}>
                <List items={lights} onClick={this.props.toggleLight} />
            </div>
            <div className={styles.rightPane}>
                <Lamps lights={lights} />
            </div>
        </div>
    }  
}