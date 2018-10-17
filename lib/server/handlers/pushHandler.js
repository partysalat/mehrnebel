import { saveFogEvent, getUserStats } from './../clients/dynamodbClient';
import pushToFogMachine from './../clients/iotClient';
import config from '../config';

function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.username) || 'test';
}

export function createFog(event, context, cb) {
  pushToFogMachine()
    .then(() => saveFogEvent(getUserNameFromEvent(event)))
    .then(({ Attributes }) => {
      cb(null, { data: { ...event.cognitoPoolClaims, stats: Attributes } });
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
