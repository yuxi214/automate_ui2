import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist-immutable/constants';

const initialState = fromJS({
  content: undefined,
  layout: {},
  tileKeyToTileName: {},
  savedTileContent: {}, // maps key to content
  activeGrid: '0',
});

const getNextTile = (layouts) => {
  const nextIndexMaxes = layouts.map(layout => layout.reduce((answer, value) => answer > Number(value.i) ? answer : Number(value.i) + 1, 0));
  const nextIndex = nextIndexMaxes.size === 0 ? '0' : nextIndexMaxes.max();
  return (
    { w: 6, h: 4, x: 0, y: 0, i: String(nextIndex), moved: false, static: false }
  );
};

export const setActiveGrid = gridNumber => ({
  type: 'setActiveGrid',
  gridNumber,
});

export const setContent = content => ({
  type: 'setContent',
  content,
});

export const saveContent = (tileKey, content) => ({
  type: 'saveContent',
  tileKey,
  content,
});

export const setLayout = (layout, gridNumber) => ({
  type: 'setLayout',
  gridNumber,
  layout,
});

export const addTile = (tileName, gridNumber) => ({
  type: 'addTile',
  gridNumber,
  tileName,
});

const fixTile = (tile) => {
  console.log('fixing tile ', tile);
  return Object.keys(tile).reduce((ans, curr) => {
    if (tile[curr] === null) {
      ans[curr] = undefined;
    } else {
      ans[curr] = tile[curr];
    }
    return ans;
  }, { });
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      /* if (action.payload && action.payload.reducer) {
        const layout = action.payload.reducer.get('layout');
        return action.payload.reducer.set('layout', layout.map(fixTile));
      }*/
      return state;
    }
    case 'setActiveGrid': {
      const { gridNumber } = action;
      return state.set('activeGrid', gridNumber);
    }
    case 'setContent': {
      return state.set('content', action.content);
    }
    case 'saveContent': {
      const { tileKey, content } = action;
      return state.setIn(['savedTileContent', tileKey], content);
    }
    case 'setLayout': {
      const { layout, gridNumber } = action;
      return state.setIn(['layout', gridNumber], layout);
    }
    case 'addTile': {
      const { tileName, gridNumber } = action;
      const tile = getNextTile(state.get('layout'));
      const layout = (state.getIn(['layout', gridNumber]) || fromJS([])).push(tile);
      const tileKeyToTileName = state.get('tileKeyToTileName').set(tile.i, tileName);
      return state.setIn(['layout', gridNumber], layout).set('tileKeyToTileName', tileKeyToTileName);
    }
    default: {
      return state;
    }
  }
};

export default gridReducer;
