import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import WithMqtt from '../../../../../data/pubsub/WithMqtt';

const MqttValue = ({ topic }) => (
  <WithMqtt
    topics={fromJS(topic ? [topic] : [])}
  >
    {topics => (
      <div
        style={{ display: 'flex', width: '100%', height: 100 }}
      >
        <div
          style={{
            padding: 35,
            paddingRight: 60,
            fontSize: 26,
            display: 'flex',
            alignItems: 'center',
          }}
        >
            Current value
          </div>
        <div
          style={{
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
          }}
        >
          {topics[topic] || 'No data'}
        </div>
      </div>
      )}
  </WithMqtt>
);

MqttValue.propTypes = {
  topic: PropTypes.string,
};

export default MqttValue;