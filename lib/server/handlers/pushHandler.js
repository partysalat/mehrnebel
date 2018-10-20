import { saveFogEvent, getUserStats } from './../clients/dynamodbClient';
import pushToFogMachine from './../clients/iotClient';
import config from '../config';

function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.username) || 'test';
}

export function createFog(event, context, cb) {
  Promise.all([
    saveFogEvent(getUserNameFromEvent(event)),
    pushToFogMachine(getUserNameFromEvent(event)),
  ]).then(([dynamoResult]) => {
    cb(null, { data: { ...event.cognitoPoolClaims, stats: dynamoResult.Attributes } });
  }).catch((err) => {
    cb(err, {});
  });
}

export function getUser(event, context, cb) {
  getUserStats(getUserNameFromEvent(event))
    .then(({ Item }) => {
      cb(null, { data: { ...event.cognitoPoolClaims, stats: Item } });
    }).catch((err) => {
      cb(err, {});
    });
}
export function getConfig(event, context, cb) {
  cb(null, config.cognito);
}
