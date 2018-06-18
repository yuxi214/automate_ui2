import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './style.css';

import getData from './data/getData';
import Appbar from './components/layout/appbar/Appbar';
import Overlay from './components/layout/overlay/Overlay';
import Drawer from './containers/layout/Drawer';


import AccountManagement from './containers/overlayContent/AccountManagement';
import Database from './containers/overlayContent/Database';
import Programming from './containers/overlayContent/Programming/Programming';

import LoginScreen from './containers/special/LoginScreen/LoginScreen';
import DisconnectedOverlay from './components/special/disconnectedOverlay/DisconnectedOverlay';

import Grid from './components/layout/grid/Grid';
import tiles from './containers/layout/Grid/components/tiles/tiles';
// const Data = getData();


const contentMap = {
  disconnected: <DisconnectedOverlay />,
  login: <LoginScreen />,
  database: <Database />,
  account: <AccountManagement />,
  programming: <Programming/>,
};


class MockApp extends Component {
    state = {
      drawerOpen: false,
      showContent: true,
      isEditable: false,
      content: contentMap.programming,
    };
    setContent = (contentType) => {
      const component = contentMap[contentType];
      this.setState({
        content: component || null,
      });
    };
    toggle = () => {
      this.setState({
        drawerOpen: !this.state.drawerOpen,
      });
    }
    toggleContent = () => {
      this.setState({
        showContent: !this.state.showContent,
      })

    };
    render() {
      window.toggle = this.toggle;
      window.set = this.setContent;

      return (
          <div style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            background: 'radial-gradient(rgb(30,30,30),rgb(20,20,20))',
            boxShadow: '0px 0px 10px 2px black inset',
          }}
          >
            <Appbar
                title="automate"
                showHideMenu
                rotateAddIcon={this.state.drawerOpen}
                systemLocked={false}
                onRotatedAddIconClick={() => {
                  console.log('rotated click');
                  this.setState({
                    drawerOpen: false,
                  });
                }}
                onAddIconClick={() => {
                  console.log('hide menu clicked');
                  this.setState({
                    drawerOpen: true,
                  });
                }}
                onUserIconClick={() => {
                  this.setContent('account');
                  this.toggleContent();
                }}
                onHideMenu={() => {
                  this.setContent('programming');
                  this.toggleContent();
                }}
                onToggle={() => {
                  console.log('toggle editable');
                  this.setState({
                    isEditable: !this.state.isEditable,
                  })
                }}
            />
            <div style={{ flexGrow: 1, position: 'relative' }}>
              <Overlay isExpanded={this.state.showContent}>
                {this.state.content}
              </Overlay>
              <Grid
                  onLayoutChange={(_, allLayouts) => {
                    localStorage.setItem('layout', JSON.stringify(allLayouts));
                  }}
                  layout={(() => {
                    try {
                      const value = JSON.parse(localStorage.getItem('layout'))
                      if (value){
                        return value;
                      }
                    }catch(err){
                    }
                  })()}
                  tiles={tiles}
                  onTileDoubleClick={tile  => {
                    console.log('clicked: ', tile);
                  }}
                  isEditable={this.state.isEditable}

              />
              <Drawer open={this.state.drawerOpen} onRequestClose={() => { this.setState({ drawerOpen: false })}} />
            </div>

          </div>
      );
    }
}


ReactDOM.render(<MockApp />, document.getElementById('root'));