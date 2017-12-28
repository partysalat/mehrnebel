import AWS from 'aws-sdk';
import config from '../config';

let client;

function getClient() {
  if (!client) {
    client = new AWS.DynamoDB.DocumentClient({
      region: config.dynamodb.region,
      endpoint: config.dynamodb.endpoint,
    });
  }
  return client;
}

function saveFogEvent(username) {
  const params = {
    TableName: config.dynamodb.userTableName,
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
    getClient().update(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }));
}

function getUserStats(username) {
  const params = {
    TableName: config.dynamodb.userTableName,
    Key: {
      username,
    },
  };
  return new Promise(((resolve, reject) => {
    getClient().get(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }));
}

export { saveFogEvent, getUserStats };

