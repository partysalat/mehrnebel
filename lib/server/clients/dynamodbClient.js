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
    UpdateExpression: 'ADD #buzzerClicked :incva',
    ExpressionAttributeNames: {
      '#buzzerClicked': 'buzzerClicked',
    },
    ExpressionAttributeValues: {
      ':incva': 1,
    },
    ReturnValues: 'ALL_NEW',

  };
  return getClient().update(params).promise();
}

function getUserStats(username) {
  const params = {
    TableName: config.dynamodb.userTableName,
    Key: {
      username,
    },
  };
  return getClient().get(params).promise();
}

function getBestlistStats() {
  const params = {
    TableName: config.dynamodb.userTableName,
    FilterExpression: '#c > :start_count',
    ExpressionAttributeNames: {
      '#c': 'buzzerClicked',
    },
    ExpressionAttributeValues: {
      ':start_count': 0,
    },
  };
  return getClient().scan(params).promise();
}
export { saveFogEvent, getUserStats, getBestlistStats };

