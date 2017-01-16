import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { container as Appbar } from './components/appbar/Appbar.js';

import { container as Grid } from './components/Grid/Grid.js';
import {  container as SelectionOverlay } from './components/SelectionOverlay/SelectionOverlay';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { fromJS } from 'immutable';

import createRoutes from './Routing';

import Menu from './components/menu/menu';
import Footer from './components/footer/footer';
import { container as AddGrid } from './components/addgrid/AddGrid';
import MinimalMenu from './components/menu/minimalMenu';


const initialState = fromJS({
  menuExpanded: false,
  addGridExpanded: false,
  isLocked: false,
});

export const expandMenu = isExpanded => {
  return ({
    type: 'expandMenu',
    isExpanded,
  });
};
export const expandAddGrid = isExpanded => {
  return ({
    type: 'expandAddGrid',
    isExpanded,
  });
};

export const lock = isLocked => {
  return ({
    type: 'lockGrid',
    isLocked,
  });
};


const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'expandMenu': {
      return state.set('menuExpanded', action.isExpanded).set('isLocked', false);
    }
    case 'lockGrid': {
      return state.set('isLocked', false);  // making it so you cannot lock grid for now
    }
    case 'expandAddGrid': {
      return state.set('addGridExpanded', action.isExpanded);
    }
    default: {
      return state;
    }
  }
};


const store = createStore(reducer, applyMiddleware(createLogger()));

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Provider store={store} >
      <div style={{ width: '100vw', height: '100vh', top: 0 , overflow: 'hidden' }}>
        <MinimalMenu />
        <Appbar />
        <SelectionOverlay />
        <Grid />
        <Menu />
        <Footer />
      </div>
    </Provider>
  </MuiThemeProvider>
);

const Routes = createRoutes(App);


ReactDOM.render(Routes, document.getElementById('root'));
