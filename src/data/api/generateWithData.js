import getWithPollingEvents from './polling/getWithEvents';
import getWithStates from './polling/getWithStates';
import getWithActions from './polling/getWithActions';
import getWithSequences from './polling/getWithSequences';
import getWithSystemInfo from './polling/getWithSystemInfo';
import getWithDatabases from './polling/getWithDatabases';
import getWithMongo from './polling/getWithMongo';
import getWithConditions from './polling/getWithConditions';
import getWithStatus from './polling/getWithStatus';
import getWithSchedules from './polling/getWithSchedules';
import getWithRules from './polling/getWithRules';
import getWithCustomTiles from './polling/getWithCustomTiles';

import getWithMqtt from './pubsub/getWithMqtt';
import getWithPubsubEvents from './pubsub/getWithEvents';

const generateWithData = ({ automateUrl, mqttBroker }) => {
  const withData = {
    polling: {
      WithActions: getWithActions(automateUrl),
      WithStates: getWithStates(automateUrl),
      WithEvents: getWithPollingEvents(automateUrl),
      WithSequences: getWithSequences(automateUrl),
      WithSystemInfo: getWithSystemInfo(automateUrl),
      WithDatabases: getWithDatabases(automateUrl),
      WithMongo: getWithMongo(automateUrl),
      WithConditions: getWithConditions(automateUrl),
      WithSchedules: getWithSchedules(automateUrl),
      WithRules: getWithRules(automateUrl),
      WithStatus: getWithStatus(automateUrl),
      WithCustomTiles: getWithCustomTiles(automateUrl),
    },
    pubsub: {
      WithMqtt: getWithMqtt(mqttBroker),
      WithEvents: getWithPubsubEvents(mqttBroker),
    },
  };
  return withData;
};

export default generateWithData;

