/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB({region: 'us-east-1'});

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  action(cb, event);
};

// Your Code
var action = function(cb, event) {
  var serviceName = event.name;
  var servicePrice = event.price;

  var params = {
    TableName: 'recur-services-dev',
    Item: {
      ServiceName: {
        S: serviceName
      },
      ServicePrice: {
        S: servicePrice
      }
    }
  }
  dynamoDb.putItem(params, function(err, data) {
    console.log(data.Item);
  })
  //return {message: 'Your JAWS lambda executed successfully!'};
};
