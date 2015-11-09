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
// TODO: Return correct response codes on error
var action = function(event, cb) {
  var serviceId = event.id;

  var params = {
    TableName: 'recur-services-dev',
    Key: {
      id: serviceId
    },
    ReturnValues: 'ALL_OLD'
  };

  docClient.delete(params, function(err, data){
    if (err) {
      return cb(err, null);
    } else {
      console.log(data.Attributes);
      cb(null, data.Attributes);
    }
  });
};
