import { getUserStats, getBestlistStats } from './../clients/dynamodbClient';
import { getUserNameFromEvent, getCognitoClaimsFromEvent } from '../services/cognitoService';


export function getUser(event, context, cb) {
  getUserStats(getUserNameFromEvent(event))
    .then(({ Item }) => {
      cb(null, { data: { ...getCognitoClaimsFromEvent(event), stats: Item } });
    }).catch((err) => {
      cb(err, {});
    });
}

export async function getBestList(event, context, cb) {
  try {
    const { Items } = await getBestlistStats();
    cb(null, {
      data: Items,
    });
  } catch (e) {
    cb(e);
  }
}
