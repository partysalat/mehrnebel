module.exports = {
  cognito: {
    userPoolId: process.env.USER_POOL_ID,
    appClientId: process.env.USER_POOL_CLIENT_ID,
    userPoolLoginUrl: process.env.USER_POOL_LOGIN_URL,
  },
  dynamodb: {
    $filter: 'stage',
    $default: {
      region: process.env.DYNAMO_REGION,
      userTableName: process.env.DYNAMO_TABLE_NAME,
    },
    offline: {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      userTableName: process.env.DYNAMO_TABLE_NAME,
    },

  },
  iot: {
    endpoint: {
      $filter: 'stage',
      $default: process.env.IOT_ENDPOINT,
      offline: '',
    },
  },
  assets: {
    baseUrl: {
      $filter: 'stage',
      $default: `https://${process.env.ASSETS_DOMAIN_NAME}`,
      offline: 'http://localhost:9211',
    },
  },
};

