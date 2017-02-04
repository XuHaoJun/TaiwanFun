import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

import ListPage from './ListPage';
import MapPage from './MapPage';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar hideTabBar>
          <Scene key="home" component={ListPage} initial={true}/>
          <Scene key="mapPage" component={MapPage}/>
        </Scene>
      </Router>
    )
  }
}
