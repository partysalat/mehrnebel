import AWS from 'aws-sdk';
import config from '../config';

let client;

function getClient(event) {
  if (!client) {
    client = new AWS.DynamoDB.DocumentClient({
      region: config.getConfig('/dynamodb/region', event),
      endpoint: config.getConfig('/dynamodb/endpoint', event),
    });
  }
  return client;
}

function saveFogEvent(event, username) {
  const params = {
    TableName: config.getConfig('/dynamodb/userTableName', event),
    Key: {
      username,
    },
    UpdateExpression: 'ADD #counter :incva',
    ExpressionAttributeNames: {
      '#counter': 'counter',
    },
    ExpressionAttributeValues: {
      ':incva': 1,
    },
    ReturnValues: 'ALL_NEW',

  };
  return new Promise(((resolve, reject) => {
    getClient(event).update(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }));
}

function getUserStats(event, username) {
  const params = {
    TableName: config.getConfig('/dynamodb/userTableName', event),
    Key: {
      username,
    },
  };
  return new Promise(((resolve, reject) => {
    getClient(event).get(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }));
}

export { saveFogEvent, getUserStats };

