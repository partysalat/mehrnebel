import * as awsIot from 'aws-iot-device-sdk';
import { utf8ByteArrayToString } from 'utf8-string-bytes';
import getInstance from '../../../app/login/httpService';
import { eventChannel } from 'redux-saga';

const MUTEX_IOT_TOPIC = 'mutex';
let client;

const onConnect = () => {
  client.subscribe(MUTEX_IOT_TOPIC);
};


const onClose = () => {
  console.log('Connection failed');
};
const onError = () => {
  connect();
};

async function getIamCredentials() {
  const httpClient = await getInstance();
  const { data } = await httpClient.get('/api/iot-credentials');
  return data.data;
}

function createEventChannel(client) {
  return eventChannel((emitter) => {
    const cb = (topic, message) => emitter(utf8ByteArrayToString(message));
    client.on('message', cb);
    return () => {
      client.off('message', cb);
    };
  });
}

export const connect = async () => {
  if (client) {
    return client;
  }

  const {
    iotEndpoint, region, accessKey, secretKey, sessionToken,
  } = await getIamCredentials();

  client = awsIot.device({
    region,
    protocol: 'wss',
    accessKeyId: accessKey,
    secretKey,
    sessionToken,
    port: 443,
    host: iotEndpoint,
  });

  client.on('connect', onConnect);

  client.on('close', onClose);
  client.on('error', onError);

  return {
    onMessageChannel: createEventChannel(client),
  };
};
export const send = (message) => {
  client.publish(MUTEX_IOT_TOPIC, message); // send messages
};
