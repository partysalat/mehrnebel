import { device } from 'aws-iot-device-sdk';
import { utf8ByteArrayToString } from 'utf8-string-bytes';
import { eventChannel } from 'redux-saga';
import getInstance from '../../../app/login/httpService';

const MUTEX_IOT_TOPIC = 'mutex';
let client;
async function getIamCredentials() {
  const httpClient = await getInstance();
  const { data } = await httpClient.get('/api/iot-credentials');
  return data.data;
}

const onConnect = () => {
  client.subscribe(MUTEX_IOT_TOPIC);
};


const onClose = () => {
  console.log('Connection failed');
};
const onError = async () => {
  console.log('Connection error try to fetch new credentials...');
  try {
    const {
      accessKey, secretKey, sessionToken,
    } = await getIamCredentials();
    client.updateWebSocketCredentials(accessKey, secretKey, sessionToken);
  } catch (e) {
    console.log('Cannot do anything ');
  }
};


function createEventChannel(client) {
  return eventChannel((emitter) => {
    const cb = (topic, message) => emitter(JSON.parse(utf8ByteArrayToString(message)));
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

  client = device({
    maximumReconnectTimeMs: 10000,
    region,
    protocol: 'wss',
    accessKeyId: accessKey,
    secretKey,
    sessionToken,
    port: 443,
    host: iotEndpoint,
  });
  window.iotClient = client;
  client.on('connect', onConnect);

  client.on('close', onClose);
  client.on('error', onError);

  return {
    onMessageChannel: createEventChannel(client),
  };
};
export const send = (message) => {
  client.publish(MUTEX_IOT_TOPIC, JSON.stringify(message)); // send messages
};
