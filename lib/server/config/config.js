module.exports = {
  cognito: {
    userPoolId: process.env.USER_POOL_ID,
    appClientId: process.env.USER_POOL_CLIENT_ID,
    userPoolLoginUrl: process.env.USER_POOL_LOGIN_URL,
  },
  assets: {
    baseUrl: {
      $filter: 'stage',
      $default: `https://${process.env.ASSETS_DOMAIN_NAME}`,
      offline: 'http://localhost:9211',
    },
  },
};

