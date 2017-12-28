import AWS from 'aws-sdk';
import config from '../config';


let client;

function getClient() {
  if (!client) {
    client = new AWS.IotData({ endpoint: config.iot.endpoint });
  }
  return client;
}
function pushToFogMachine() {
  const params = {
    topic: 'mehrnebel',
    payload: 'do it!',
    qos: 1,
  };
  return new Promise(((resolve, reject) => {
    getClient().publish(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('success?');
        resolve(data);
      }
    });
  }));
}


export default pushToFogMachine;
