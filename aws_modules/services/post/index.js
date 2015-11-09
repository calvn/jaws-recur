/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB({region: 'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
var uuid = require('node-uuid');

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  action(event, cb);
};

// Your Code
// POST should automatically generate a UUID
// and base64 encode it to shorten it/remove the hyphens.
// TODO: Refactor to use docClient
var action = function(event, cb) {
  var serviceId = new Buffer(uuid.v4()).toString('base64');
  var serviceName = event.name;
  var servicePrice = event.price;

  var params = {
    TableName: 'recur-services-dev',
    Item: {
      id: serviceId,
      name: serviceName,
      price: servicePrice
    }
  };

  // Should return data.Attributes or similar
  docClient.put(params, function(err, data) {
    if (err) {
      return cb(err, null);
    } else {
      console.log(params.Item);
      cb(null, params.Item);
    }
  });
};
