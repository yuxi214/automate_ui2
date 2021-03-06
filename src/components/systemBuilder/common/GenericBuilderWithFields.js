import React, { Component, PropTypes } from 'react';
import GenericBuilder from './GenericBuilder';
import JavascriptsFields from './javascripts/JavascriptsFields';
import MqttFields from './mqtt/MqttFields';
import { Desktop } from '../../../util/ViewportSizing';

class ActionBuilder extends Component {
  render() {
    const {
      actions,
      actionCode,
      selectedIndex,
      onActionChange,
      onActionSelected,
      actionName,
      actionType,
      onUpload,
      axiomClass,
      showRate,
      rate,
    } = this.props;

    return (
      <GenericBuilder
        axiomClass={axiomClass}
        axioms={actions}
        onAxiomChange={onActionChange}
        selectedIndex={selectedIndex}
        onAxiomSelected={onActionSelected}
        axiomName={actionName}
      >
        {(actions.length > 0) && <div>
          <MqttFields
            topic={actionName}
          />
          <Desktop>
            {(actionType === 'javascript') && (
              <JavascriptsFields
                initialText={actionCode}
                rate={rate}
                showRate={showRate}
                upload={onUpload}
                name={actionName}
              />
            )}
          </Desktop>
        </div>}
        {(actions.length === 0) && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                top: '30%',
                color: 'rgb(110,110,110)',
                fontFamily: 'monospace',
                fontSize: 48,
              }}>
              {axiomClass.toLowerCase()}
            </div>
          )}
      </GenericBuilder>
    );
  }
}

ActionBuilder.propTypes = {
  axiomClass: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onActionChange: PropTypes.func.isRequired,
  onActionSelected: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  actionCode: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  showRate: PropTypes.bool,
  rate: PropTypes.number,
};

export default ActionBuilder;
