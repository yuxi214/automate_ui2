import generateWithDataComponent from './util/generateWithDataComponent';

import getWithPollingEvents from './polling/getWithEvents';
import getWithStates from './polling/getWithStates';
import getWithActions from './polling/getWithActions';
import getWithActionScripts from './polling/getWithActionScripts';
import getWithSequences from './polling/getWithSequences';
import getWithStatus from './polling/getWithStatus';
import getWithCustomTiles from './polling/getWithCustomTiles';
import getWithEnv from './polling/getWithEnv';
import getWithIsSystemLocked from './polling/getWithIsSystemLocked';
import getWithAccounts from './polling/getWithAccounts';
import getWithMyAccount from './polling/getWithMyAccount';

import getWithMqtt from './pubsub/getWithMqtt';
import getWithPubsubEvents from './pubsub/getWithEvents';

import getLoginWithToken from './requests/getLoginWithToken';
import getStyleSheet from './requests/getStyleSheet';

const generateWithData = ({ automateUrl, mqttBroker }) => {
  const withData = {
    polling: {
      WithActions: generateWithDataComponent(automateUrl, getWithActions),
      WithActionScripts: generateWithDataComponent(automateUrl, getWithActionScripts),
      WithStates:  generateWithDataComponent(automateUrl, getWithStates),
      WithEvents: generateWithDataComponent(automateUrl, getWithPollingEvents),
      WithSequences:generateWithDataComponent(automateUrl, getWithSequences),
      WithStatus: generateWithDataComponent(automateUrl, getWithStatus),
      WithCustomTiles: getWithCustomTiles(automateUrl),
      WithEnv: generateWithDataComponent(automateUrl, getWithEnv),
      WithIsSystemLocked: getWithIsSystemLocked(automateUrl),
      WithAccounts: generateWithDataComponent(automateUrl, getWithAccounts),
      WithMyAccount: generateWithDataComponent(automateUrl, getWithMyAccount),
    },
    pubsub: {
      WithMqtt: getWithMqtt(mqttBroker),
      WithEvents: getWithPubsubEvents(mqttBroker),
    },
    requests: {
      loginWithToken: getLoginWithToken(automateUrl),
      stylesheet: getStyleSheet(automateUrl),
    },
  };
  return withData;
};

export default generateWithData;

