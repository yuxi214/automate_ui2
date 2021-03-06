import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist-immutable/constants';
import extraProps from './util/extraProps';

const initialState = fromJS({
  content: undefined,
  layout: {},
  tileKeyToTileName: {},
  tileKeyToTileGrid: { },
  savedTileContent: {}, // maps key to content
  activeGrid: 'Home',
  grids: [],
  gridBackgroundUrl: 'https://uglyduckblog.files.wordpress.com/2014/02/cat-with-cosmos-glasses-animal-hd-wallpaper-1920x1080-1233.jpg',
});


const getNextTile = (layouts, tileName) => {
  const nextIndexMaxes = layouts.map(
    layout => layout.reduce(
      (answer, value) => (answer > Number(value.i) ? answer : Number(value.i) + 1), 0),
  );

  const nextIndex = nextIndexMaxes.size === 0 ? '0' : nextIndexMaxes.max();
  const extraPropForTile = extraProps[tileName];

  let width = 6;
  if (extraPropForTile && extraPropForTile.maxW && (width > extraPropForTile.maxW)) {
    width = extraPropForTile.maxW;
  }
  if (extraPropForTile && extraPropForTile.minW && (width < extraPropForTile.minW)) {
    width = extraPropForTile.minW;
  }

  let height = 4;
  if (extraPropForTile && extraPropForTile.maxH && (height > extraPropForTile.maxH)) {
    height = extraPropForTile.maxH;
  }
  if (extraPropForTile && extraPropForTile.minH && (width < extraPropForTile.minH)) {
    height = extraPropForTile.minH;
  }
  return (
  {
    w: width,
    h: height,
    x: 0,
    y: 0,
    i: String(nextIndex),
    moved: false,
    static: false,
    ...extraPropForTile,
  }
  );
};

export const setBackground = gridBackgroundUrl => ({
  type: 'setBackground',
  gridBackgroundUrl,
});

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

export const addTile = (tileName, gridNumber, { isCustom, url }) => ({
  type: 'addTile',
  gridNumber,
  tileName,
  isCustom,
  url,
});

export const deleteTile = tileKey => ({
  type: 'deleteTile',
  tileKey,
});

export const addGrid = gridName => ({
  type: 'addGrid',
  gridName,
});

const fixTile = tile => Object.keys(tile).reduce((ans, curr) => {
  if (tile[curr] === null) {
    ans[curr] = undefined; // eslint-disable-line
  } else {
    ans[curr] = tile[curr]; // eslint-disable-line
  }
  return ans;
}, { });

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.payload && action.payload.gridReducer) {
        const gridBackgroundUrl = action.payload.gridReducer.get('gridBackgroundUrl');
        const grids = action.payload.gridReducer.get('grids');
        const savedTileContent = action.payload.gridReducer.get('savedTileContent');
        const tileKeyToTileName = action.payload.gridReducer.get('tileKeyToTileName');
        const tileKeyToTileGrid = action.payload.gridReducer.get('tileKeyToTileGrid');

        const layouts = action.payload.gridReducer.get('layout');
        const fixedLayout = layouts.map(layout => layout.map(fixTile));

        return (
            state
            .set('grids', grids)
            .set('savedTileContent', savedTileContent)
            .set('tileKeyToTileName', tileKeyToTileName)
            .set('layout', fixedLayout)
            .set('gridBackgroundUrl', gridBackgroundUrl)
            .set('tileKeyToTileGrid', tileKeyToTileGrid)
        );
      }
      return state;
    }
    case 'setBackground': {
      const { gridBackgroundUrl } = action;
      return state.set('gridBackgroundUrl', gridBackgroundUrl);
    }
    case 'setActiveGrid': {
      const { gridNumber } = action;
      return state.set('activeGrid', gridNumber);
    }
    case 'setContent': {  // this is the content of the overlay
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
    case 'addGrid': {
      const { gridName } = action;
      return state.set('grids', state.get('grids').push(gridName));
    }
    case 'addTile': {
      const { tileName, gridNumber } = action;
      const tile = getNextTile(state.get('layout'), tileName);
      const layout = (state.getIn(['layout', gridNumber]) || fromJS([])).push(tile);
      const tileKeyToTileName = state.get('tileKeyToTileName').set(tile.i, tileName);
      return (state
        .setIn(['layout', gridNumber], layout)
        .set('tileKeyToTileName', tileKeyToTileName)
        .setIn(['tileKeyToTileGrid', tile.i], gridNumber)
      );
    }
    case 'deleteTile': {
      const { tileKey } = action;
      const gridNumber = state.getIn(['tileKeyToTileGrid', tileKey]);
      const layout = state.getIn(['layout', gridNumber]).filter(tile => tile.i !== tileKey);

      return (
        state.setIn(['layout', gridNumber], layout)
        .deleteIn(['tileKeyToTileName', tileKey])
        .deleteIn(['tileKeyToTileGrid', tileKey])
        .deleteIn(['savedTileContent', tileKey])
      );
    }
    default: {
      return state;
    }
  }
};

export default gridReducer;
