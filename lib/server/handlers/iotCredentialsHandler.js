import { STS } from 'aws-sdk';
import config from './../config';

const sts = new STS();
const roleName = config.mutex.iamRole;
const iotEndpoint = config.iot.endpoint;

function getRandomInt() {
  return Math.round(Math.random() * 1000000);
}

export const getCredentials = (event, context, callback) => {
  // get the endpoint address

  const region = 'eu-central-1';

  // get the account id which will be used to assume a role
  const params = {
    RoleArn: roleName,
    RoleSessionName: getRandomInt().toString(),
  };

  // assume role returns temporary keys
  sts.assumeRole(params, (err, data) => {
    if (err) return callback(err);

    const res = {
      data: {
        iotEndpoint,
        region,
        accessKey: data.Credentials.AccessKeyId,
        secretKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken,
      },
    };

    return callback(null, res);
  });
};
