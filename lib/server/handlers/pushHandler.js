import pushFog from './../services/dynamodbClient';

function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.data && event.cognitoPoolClaims.data.username) || 'test';
}

function createFog(event, context, cb) {
  pushFog(event, getUserNameFromEvent(event))
    .then((data) => {
      cb(null, { data: { ...event.cognitoPoolClaims, ...data } });
    }).catch((err) => {
      cb(err, {});
    });
}

module.exports.createFog = createFog;
