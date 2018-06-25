let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
let connectionManager = require('./ConnectionManager');
const rds = new SL_AWS.RDS(connectionManager);
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

    // You can pass the existing connection to this function.
    // A new connection will be created if it's not present as the third param 
    // You must always end/destroy the DB connection after it's used
    rds.query({
        instanceIdentifier: 'demoUser',
        query: 'INSERT INTO Persons(PersonID,LastName)VALUES(?,?)',
        inserts: [0, "Andun"]
    }, function (error, results, connection) {
        if (error) {
            console.log("Error occurred");
            throw error;
        } else {
            console.log("Success")
            console.log(results);
        }

        connection.end();
    });


    callback(null, 'Successfully executed');
}