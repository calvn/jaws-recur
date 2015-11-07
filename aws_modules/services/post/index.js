/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB({region: 'us-east-1'});
var uuid = require('node-uuid');

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  action(event, cb);
};

// Your Code
// POST should automatically generate a UUID
// and base64 encode it to shorten it/remove the hyphens.
var action = function(event, cb) {
  var serviceId = new Buffer(uuid.v4()).toString('base64');
  var serviceName = event.name;
  var servicePrice = event.price;

  var queryParams = {
    TableName: 'recur-services-dev',
    IndexName: 'name-index',
    KeyConditions: {
      name: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: serviceName
          }
        ]
      }
    }
  };
  // Check whether name exists
  dynamoDb.query(queryParams, function(err, data) {
    if (err) {
      cb(err, null);
    } else {
      if (data.Count != 0) {
        // TODO: Return appropriate response code.
        cb(null, 'User alredy exists');
      } else {
        // Insert if not present
        var params = {
          TableName: 'recur-services-dev',
          Item: {
            id: {
              S: serviceId
            },
            name: {
              S: serviceName
            },
            price: {
              S: servicePrice
            }
          }
        };
        dynamoDb.putItem(params, function(err, data) {
          if (err) {
            cb(err, null);
          } else {
            // It should be the item as JSON
            cb(null, 'OK');
          }
        });
      }
    }
  });
};
