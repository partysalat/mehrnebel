import { pushFog, getUserStats } from './../services/dynamodbClient';

function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.username) || 'test';
}

function createFog(event, context, cb) {
  pushFog(event, getUserNameFromEvent(event))
    .then(({ Attributes }) => {
      cb(null, { data: { ...event.cognitoPoolClaims, stats: Attributes } });
    }).catch((err) => {
      cb(err, {});
    });
}

function getUser(event, context, cb) {
  getUserStats(event, getUserNameFromEvent(event))
    .then(({ Item }) => {
      cb(null, { data: { ...event.cognitoPoolClaims, stats: Item } });
    }).catch((err) => {
      cb(err, {});
    });
}

module.exports.createFog = createFog;
module.exports.getUser = getUser;
