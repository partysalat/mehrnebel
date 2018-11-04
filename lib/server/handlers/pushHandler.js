import { saveFogEvent } from './../clients/dynamodbClient';
import pushToFogMachine from './../clients/iotClient';
import config from '../config';
import { getCognitoClaimsFromEvent, getUserNameFromEvent } from '../services/cognitoService';


export function createFog(event, context, cb) {
  const userName = getUserNameFromEvent(event);
  Promise.all([
    saveFogEvent(userName),
    pushToFogMachine(userName),
  ]).then(([dynamoResult]) => {
    cb(null, {
      data: {
        ...getCognitoClaimsFromEvent(event),
        stats: dynamoResult.Attributes,
      },
    });
  }).catch((err) => {
    cb(err, {});
  });
}

export function getConfig(event, context, cb) {
  cb(null, config.cognito);
}
