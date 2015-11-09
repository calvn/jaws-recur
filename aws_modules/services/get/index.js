/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return action(cb)
};

// Your Code
var action = function(cb) {
  var params = {
    TableName: 'recur-services-dev',
    // AttributesToGet: [ 'name' ]
  }

  docClient.scan(params, function(err, data){
    console.log(data.Items);
    if(err) {
      return cb(err, null);
    } else {
      cb(null, data.Items);
    }
  });
};
