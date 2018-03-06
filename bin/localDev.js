// script to execute in dynamodb shell, open http://localhost:8000/shell/

var params = {
  TableName: 'usersFogTable-local',
  KeySchema: [
    {
      AttributeName: 'username',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'username',
      AttributeType: 'S',
    },


  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

dynamodb.createTable(params, function(err, data) {
  if (err) ppJson(err); // an error occurred
  else ppJson(data); // successful response

});