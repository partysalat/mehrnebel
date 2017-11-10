const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
  region: 'eu-central-1',
  keyPath: './aws_iot_thing.key',
  certPath: './fe054b2030-certificate.pem.crt',
  caPath: './VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: 'smokemachine',
  host: 'aen1uw1vkeumx.iot.eu-central-1.amazonaws.com',
});
// mqtt js
device
  .on('connect', () => {
    console.log('connect');
    device.subscribe('mehrnebel');
    // device.publish('topic_2', JSON.stringify({ test_data: 1}));
  });

device
  .on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
  });
