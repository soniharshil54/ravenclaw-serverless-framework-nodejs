const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { ENVIRONMENTS_TABLE } = process.env;

module.exports.handler = async (event) => {
  // const environments = [
  //   {
  //     channelName: "Private",
  //     envName: "development",
  //     envLabel: "Appgambit Office Development",
  //     envConfig: {
  //       region: "us-east-1"
  //     }
  //   },
  //   {
  //     channelName: "Private",
  //     envName: "test",
  //     envLabel: "Rich Demo",
  //     envConfig: {
  //       region: "us-east-1"
  //     }
  //   }
  // ]
  
  const environmentRecords = await docClient.scan({
    TableName: ENVIRONMENTS_TABLE,
    FilterExpression: "#channelName = :channelName",
    ExpressionAttributeNames: {
        "#channelName": "channelName",
    },
    ExpressionAttributeValues: { ":channelName": 'Private' },
  }).promise()

  const environments = environmentRecords && environmentRecords.Items ? environmentRecords.Items : [];

  console.log('environmentRecords', environmentRecords);
  const responseBody = {
    data: environments
  }
  const response = {
    statusCode : 200,
    body : JSON.stringify(responseBody),
    isBase64Encoded : false,
    headers : {"content-type" : "application/json"}
  }
  return response;
}