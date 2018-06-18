import React, { Component } from 'react';
import './style.css';

const getActionScript = (Header, SelectableTypes, CodeEditor, EditorControls) => {

  class ActionScript extends Component {
    state = {
      selectedIndex: 0,
    };

    render() {
      return (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Header
                itemName={'some name'}
                itemType={'some type'}
                deleteSequence={() => {
                }}
            />
            <div style={{display: 'flex', flexGrow: 1}}>
              <SelectableTypes
                  items={['one', 'two', 'three', 'four']}
                  selectedIndex={this.state.selectedIndex}
                  onItemSelected={(_, selectedIndex) => {
                    console.log('selected');
                    this.setState({
                      selectedIndex,
                    })
                  }}
              />
              <div className="actionscript_editor_wrapper">
                <EditorControls showRate={false} />
                <CodeEditor
                    initialText={"// insert code here \n\n"}
                    onTextChange={() => { }}
                    name="action script name"
                />
              </div>
            </div>
          </div>
      )
    }
  }

  return ActionScript;
};


export default getActionScript;