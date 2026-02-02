const dotenv = require('dotenv');
const path = require('path');
const { NodeHttpHandler } = require("@smithy/node-http-handler");

const appDir = path.dirname(require.main.filename);
dotenv.config({
    path: path.resolve(appDir, `.env`)
});
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 4000,
    APP_NAME: process.env.APP_NAME,

    SERVICE_FILE : process.env.SERVICE_FILE,

    FIREBASE_APIKEY : process.env.APIKEY,
    FIREBASE_AUTODOMAIN : process.env.AUTODOMAIN,
    FIREBASE_PROJECTID : process.env.PROJECTID,
    FIREBASE_STORAGEBUCKET : process.env.STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID : process.env.MESSAGINGSENDERID,
    FIREBASE_APPID : process.env.APPID,
    FIREBASE_MEASUREMENTID : process.env.MEASUREMENTID,

    APIURL: process.env.APIURL,
    WEBURL: process.env.WEBURL,

    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_EMAIL_PASSWORD : process.env.NODEMAILER_EMAIL_PASSWORD,
    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,

    AWS_SES_KEY: process.env.AWS_SES_KEY,
    AWS_SES_SECRET: process.env.AWS_SES_SECRET,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    AWS_SES_FROM_DEFAULT: process.env.AWS_SES_FROM_DEFAULT,

    ENDPOINT_KEY: process.env.ENDPOINT_KEY,

    CHARGEBEE_SITE: process.env.CHARGEBEE_SITE,
    CHARGEBEE_API_KEY: process.env.CHARGEBEE_API_KEY,
    MONGODB_URL:process.env.MONGODB_URL,

    ERRORRECIVEREMAIL:process.env.ERRORRECIVEREMAIL,
    NOOFPRESETCOMPANY: process.env.NOOFPRESETCOMPANY,
    PRECOMPANYKEY: process.env.PRECOMPANYKEY,

    CANYONAPIURL: process.env.CANYONAPIURL,
    CANYONLICENSEKEY:process.env.CANYONLICENSEKEY,
    ENTERPRISEURL: process.env.ENTERPRISEURL,
    CANYONLICENSETYPE: process.env.CANYONLICENSETYPE,
    PAYMENTMETHOD: process.env.PAYMENTMETHOD,

    AI_API_KEY:process.env.AI_API_KEY,
    AI_MODEL:process.env.AI_MODEL,

    STORAGE_TYPE:process.env.STORAGE_TYPE,

    PADDLE_URL:process.env.PADDLE_URL,
    PADDLE_API_KEY:process.env.PADDLE_API_KEY,
    UNDER_MAINTENANCE: process.env.UNDER_MAINTENANCE,
    myCache: myCache,
    requestHandler: new NodeHttpHandler({
        connectionTimeout: 300000, // 5 minutes
        socketTimeout: 300000, // 5 minutes
    })
}