/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB({region: 'us-east-1'});
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return cb(null, action());
};

// Your Code
var action = function() {
  var params = {
    TableName: 'recur-services-dev',
    AttributesToGet: [ 'ServiceName' ]
  }

  dynamoDb.scan(params, function(err, data){
    if (err) {
      cb(err, null);
    } else {
      // console.log(data)
      // Need to return back as an JSON array
      var items = data.Items.map(unmarshalItem);
      console.log(items)
    }
  });
};
