const admin = require("firebase-admin");
const config =  require('./config');

//Initialize Admin
var serviceAccount = require(config.SERVICE_FILE);
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch(error) {
    console.log("Firebase Error:", error);
}
const fcm = admin.messaging();

module.exports = {
    admin,
    fcm
};