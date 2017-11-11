const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
  region: 'eu-central-1',
  keyPath: './certs/aws_iot_thing.key',
  certPath: './certs/fe054b2030-certificate.pem.crt',
  caPath: './certs/VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: 'smokemachine-1',
  host: 'aen1uw1vkeumx.iot.eu-central-1.amazonaws.com',
});
// mqtt js
device
  .on('connect', () => {
    console.log('connect');
    device.subscribe('mehrnebel');
  });

device
  .on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
  });
