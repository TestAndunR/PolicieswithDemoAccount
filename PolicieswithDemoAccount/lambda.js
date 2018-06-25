let AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();
let SL_AWS = require('slappforge-sdk-aws');
let connectionManager = require('./ConnectionManager');
const sns = new AWS.SNS();
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();


exports.handler = function (event, context, callback) {
    let name = event.name

    ddb.put({
        TableName: 'demoDDB',
        Item: { 'demoUser': name }
    }, function (err, data) {
        if (err) {
            //handle error
        } else {
            //your logic goes here
        }
    });
    s3.listObjects({
        'Bucket': 'demouser.bucket',
        'MaxKeys': 10,
        'Prefix': ''
    }).promise()
        .then(data => {
            console.log(data);           // successful response
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });
    sns.publish({
        Message: 'DemoUser',
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'Andun'
            },
        },
        PhoneNumber: '+94770630943'
    }).promise()
        .then(data => {
            console.log("Success");
        })
        .catch(err => {
            console.log(err);
        });

    kinesis.describeStream({
        StreamName: 'demo-user-stream'
    }).promise()
        .then(data => {
            // your logic goes here
            console.log(data)
        })
        .catch(err => {
            // error handling goes here
            console.log(err)
        });




    callback(null, 'Successfully executed');
}