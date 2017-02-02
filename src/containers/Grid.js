import React from 'react';
import { List } from 'immutable';
import Grid from '../components/grid/Grid';
import { connect } from 'react-redux';
import { expandMenu, setContent, setLayout } from '../index.js';

import { tileNameToContent } from '../tiles';


const TileToRender = ({tileName}) => {
  return tileNameToContent.get(tileName);
};

const mapStateToProps = (state) => ({
  isEditable: !state.getIn(['reducer','isLocked']),
  layout: state.getIn(['reducer', 'layout']),
});

const mapDispatchToProps = dispatch => ({
  onGridItemClick: tileName =>  {
    dispatch(setContent(<TileToRender tileName={tileName} />));
    dispatch(expandMenu(true));
  },
  onLayoutChange: layout => {
    dispatch(setLayout(List(layout)));
  }
});

export const container = connect(mapStateToProps, mapDispatchToProps)(Grid);
