module.exports = {
  assets: {
    baseUrl: {
      $filter: 'stage',
      $default: 'https://d3uvuu7w0t7mfq.cloudfront.net',
      offline: 'http://localhost:9211',
    },
  },
};

