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
// TODO: Make name and price be optional parameters and
// return proper response code if not modified/found
var action = function(event, cb) {
  var serviceId = event.id;
  var serviceName = event.name;
  var servicePrice = event.price;



  var params = {
    TableName: 'recur-services-dev',
    Key: {
      id: serviceId
    },
    ReturnValues: 'ALL_NEW',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#price': 'price'
    },
    ExpressionAttributeValues: {
      ':serviceName': serviceName,
      ':servicePrice': servicePrice
    },
    UpdateExpression: 'SET #name = :serviceName, #price = :servicePrice'
  }

  docClient.update(params, function(err, data) {
    if(err) {
      return cb(err, null);
    } else {
      console.log(data.Attributes);
      cb(null, data.Attributes);
    }
  });
};
