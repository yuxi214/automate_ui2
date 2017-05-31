import getWithPollingEvents from './polling/getWithEvents';
import getWithStates from './polling/getWithStates';
import getWithActions from './polling/getWithActions';
import getWithSequences from './polling/getWithSequences';
import getWithSystemInfo from './polling/getWithSystemInfo';
import getWithMongo from './polling/getWithMongo';
import getWithConditions from './polling/getWithConditions';
import getWithStatus from './polling/getWithStatus';

import getWithMqtt from './pubsub/getWithMqtt';
import getWithPubsubEvents from './pubsub/getWithEvents';

const generateHooks = ({ automateUrl, mqttBroker }) => {
  const withDataHooks = {
    polling: {
      WithActions: getWithActions(automateUrl),
      WithStates: getWithStates(automateUrl),
      WithEvents: getWithPollingEvents(automateUrl),
      WithSequences: getWithSequences(automateUrl),
      WithSystemInfo: getWithSystemInfo(automateUrl),
      WithMongo: getWithMongo(automateUrl),
      WithConditions: getWithConditions(automateUrl),
      WithStatus: getWithStatus(automateUrl),
    },
    pubsub: {
      WithMqtt: getWithMqtt(mqttBroker),
      WithEvents: getWithPubsubEvents(mqttBroker),
    },
  };
  return withDataHooks;
};

export default generateHooks;

