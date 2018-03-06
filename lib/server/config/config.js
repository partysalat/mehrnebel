module.exports = {
  cognito: {
    userPoolId: process.env.USER_POOL_ID,
    appClientId: process.env.USER_POOL_CLIENT_ID,
    userPoolLoginUrl: process.env.USER_POOL_LOGIN_URL,
  },
  dynamodb: {
    region: process.env.DYNAMO_REGION,
    endpoint: process.env.DYNAMO_ENDPOINT,
    userTableName: process.env.DYNAMO_TABLE_NAME,
  },
  iot: {
    endpoint: process.env.IOT_ENDPOINT,
    enabled: process.env.IOT_ENABLED === 'true',
  },
  assets: {
    baseUrl: process.env.ASSETS_DOMAIN_NAME,
  },
};

