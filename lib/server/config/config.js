module.exports = {
  assets: {
    baseUrl: {
      $filter: 'stage',
      $default: `https://${process.env.ASSETS_DOMAIN_NAME}`,
      offline: 'http://localhost:9211',
    },
  },
};

