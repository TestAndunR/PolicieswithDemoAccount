let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
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


    callback(null, 'Successfully executed');
}