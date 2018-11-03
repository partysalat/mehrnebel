import { saveFogEvent, getUserStats } from './../clients/dynamodbClient';
import pushToFogMachine from './../clients/iotClient';
import config from '../config';

const TEST_COGNITO_CLAIMS = {
  email: 'foo@bar.de',
  name: 'test',
  sub: 'gjringorei',
  username: 'test',
};

function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.username) || 'test';
}

export function createFog(event, context, cb) {
  Promise.all([
    saveFogEvent(getUserNameFromEvent(event)),
    pushToFogMachine(getUserNameFromEvent(event)),
  ]).then(([dynamoResult]) => {
    cb(null, {
      data: {
        ...event.cognitoPoolClaims || TEST_COGNITO_CLAIMS,
        stats: dynamoResult.Attributes,
      },
    });
  }).catch((err) => {
    cb(err, {});
  });
}

export function getUser(event, context, cb) {
  getUserStats(getUserNameFromEvent(event))
    .then(({ Item }) => {
      cb(null, { data: { ...event.cognitoPoolClaims || TEST_COGNITO_CLAIMS, stats: Item } });
    }).catch((err) => {
      cb(err, {});
    });
}
export function getConfig(event, context, cb) {
  cb(null, config.cognito);
}
