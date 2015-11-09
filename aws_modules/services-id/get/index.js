/**
 * AWS Module: Action: Modularized Code
 */
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return action(event, cb);
};

// Your Code
var action = function(event, cb) {
  var serviceId = event.id;

  var params = {
    TableName: 'recur-services-dev',
    Key: {
      id: event.id
    }
  };

  docClient.get(params, function(err, data) {
    console.log(data.Item);
    if(err) {
      return cb(err, null);
    } else {
      cb(null, data.Item);
    }
  });
};
