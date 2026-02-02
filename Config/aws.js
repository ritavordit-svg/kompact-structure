const AWS = require('aws-sdk');
const SES = require("aws-sdk/clients/ses");

/**
 * AWS mail confurations
 */
AWS.config.update({
    accessKeyId: process.env.AWS_SES_KEY,
    secretAccessKey: process.env.AWS_SES_SECRET,
    region: process.env.AWS_SES_REGION
});

const ses = new AWS.SES({apiVersion: '2010-12-01'});
const sesWithAttachment = new SES();
const sesv2 = new AWS.SESV2({apiVersion: '2019-09-27'});
const ssmClient = new AWS.SSM({apiVersion: '2014-11-06', region: process.env.AWS_SES_REGION});
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const wasabiAccessKey = process.env.WASABI_ACCESS_KEY
const wasabiSecretAccessKey = process.env.WASABI_SECRET_ACCESS_KEY
const wasabiEndPoint = process.env.WASABIENDPOINT
const region = process.env.WASABI_REGION
const iamEndPoint = process.env.IAM_ENDPOINT
const userProfileBucket = process.env.USERPROFILEBUCKET
const wasabiUserId = process.env.WASABI_USERID
/**
 * AWS SSM parameters
 */
// let ssm;
// const getParameters = async (parameterNames, region, apiVersion='2014-11-06') => {
//     if (!ssm) {
//         ssm = new AWS.SSM({apiVersion: apiVersion, region: region});
//     }
//     const params = {
//         Names: parameterNames,
//         WithDecryption: true
//     };
//     try {
//         const parameters = await ssm.getParameters(params).promise();
//         return formatParameters(parameters);
//     } catch (e) {
//         return e;
//     }
// };
// const formatParameters = (parameters) => {
//     return parameters.Parameters.reduce((object, param) => {
//     return { ...object, [param.Name]: param.Value };
//   }, {});
// };

/**
 * Add the AWS SSM parameter list which we want
 */
// const parameterNames = [
//     '/dev/app/Firebase',
//     '/prod/app/Firebase',
//     '/dev/app/JWT',
//     '/dev/app/WPSLogin',
// ];
// getParameters(parameterNames, process.env.AWS_SES_REGION);


module.exports = {
    ses,
    sesWithAttachment,
    sesv2,
    ssmClient,
    s3,
    wasabiEndPoint,
    wasabiAccessKey,
    wasabiSecretAccessKey,
    region,
    iamEndPoint,
    userProfileBucket,
    wasabiUserId
}
