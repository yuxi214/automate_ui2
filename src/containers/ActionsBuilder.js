import React, { Component, PropTypes } from 'react';
import ActionBuilder from '../components/actionBuilder/ActionBuilder';
import WithActions from '../data/WithActions';

class ActionsBuilder extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedIndex: 0,
      actions: ['one', 'two action', 'three action'],
      actionCode: {
        one: 'function() { return 1 }',
        'two action': 'function() { return 2 } ',
        'three action': 'function() { return 3 } '
      }
    }
  }
  render() {
    return (
      <WithActions>
        {({ actions }) => (
          <ActionBuilder
            actions={actions.map(action => action.name)}
            actionName={actions[this.state.selectedIndex].name}
            selectedIndex={this.state.selectedIndex}
            onActionChange={actions => {
              this.setState({actions})
            }}
            onActionSelected={(_, selectedIndex) => {
              this.setState({selectedIndex})
            }}
            actionCode={this.state.actionCode[this.state.actions[this.state.selectedIndex]]}
          />
        )}
      </WithActions>
    )
  }
}

export default ActionsBuilder;

