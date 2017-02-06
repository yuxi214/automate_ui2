import React, { Component, PropTypes } from 'react';
import { List, Map } from 'immutable';
import { tile as TemperatureTile, overlay as TemperatureOverlay } from './tiles/temperature/Temperature';
import { tile as DimmerTile, overlay as DimmerOverlay } from './tiles/lightdimmer/LightDimmer';
import { tile as MqttTile, overlay as MqttOverlay } from './tiles/mqtt/MqttDisplay';
import WithMqtt from '../../mqtt/WithMqtt';
import { connect } from 'react-redux';
import { saveContent } from './module';

class Tile extends Component {
  render() {
    const { tileName, ...otherProps } = this.props;
    switch (tileName){
      case 'mqtt': {
        return <MqttTile {...otherProps} />
      }
      case 'dimmer': {
        return <DimmerTile {...otherProps} />
      }
      case 'test': {
        return <div>hello world</div>
      }
      default :{
        return <div>invalid tile</div>;
      }
    }
  }
}

class TileOverlay extends Component {
  render() {
    const { tileName, ...otherProps } = this.props;
    switch (tileName){
      case 'mqtt': {
        return <MqttOverlay {...otherProps} />
      }
      case 'dimmer': {
        return <DimmerOverlay {...otherProps} />
      }
      case 'test': {
        return <div>test overlay</div>
      }
      default :{
        return <div>invalid tile</div>;
      }
    }
  }
}

const TileWrapper = ({children, tileKey, savedContent, saveContent }) => {
  console.log('tilekey ------- in tw ----  ', tileKey);
  const saveContentForTile = content => saveContent(tileKey, content);
  return children({ savedContent: savedContent.get(tileKey), saveContent: saveContentForTile });
}
TileWrapper.propTypes = {
  savedContent: PropTypes.object,
  saveContent: PropTypes.func,
};

const mapStateToProps = (state) => ({
  savedContent: state.getIn(['reducer', 'savedTileContent']),
});

const mapDispatchToProps = dispatch => ({
  saveContent: (tileKey, content) => dispatch(saveContent(tileKey, content))
});

const Wrapper = connect(mapStateToProps, mapDispatchToProps)(TileWrapper);



export const tileNameToTile = {
  get: (tileName, tileKey) => {
    console.log('tilekey is: ', tileKey);
    return (
      <Wrapper
        tileKey={tileKey}>
        {({savedContent, saveContent }) =>
          <Tile
            tileName={tileName}
            saveContent={saveContent}
            savedContent={savedContent}
          />}
      </Wrapper>)
  }
};

export const tileNameToContent = {
  get: (tileName, tileKey) => {
    console.log('tikkkkekey is-:  ', tileKey);
    return (
      <Wrapper tileKey={tileKey}>
        {({savedContent, saveContent}) => {
          console.log(saveContent);
          return (
            <TileOverlay
              saveContent={saveContent}
              savedContent={savedContent}
              tileName={tileName}/>
          )}
        }
      </Wrapper>)
  }
}