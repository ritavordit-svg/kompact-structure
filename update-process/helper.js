const fs = require("fs");
const { emitListener } = require("./eventController.js");
const env = require("../Config/config");
const logger = require("../Config/loggerConfig");


/**
 * Generate Log
 * @param {String} version 
 * @param {String} data 
 */
exports.generateLog = (version, data) => {
    const path = __dirname + "/../log/update-" + version + ".log";
    emitListener('read-log-' + version, {message: data});
    if (!fs.existsSync(path)) {
        fs.writeFile(path, data, (err, wData) => {
            if (err) {
                logger.error(`File Create Issue: ${path} : Error: ${err}`);
                return false;
            }
            return true;
        })
    } else {
        fs.appendFile(path, '\n'+data, function (err) {
            if (err) {
                logger.error(`File Update Issue: ${path} : Error: ${err}`);
                return false;
            };
            return true;
        });
    }
};


exports.restartServer = () => {
    process.exit();
}

/**
 * Get Folder Name
 * @returns 
 */
exports.getFolderName = () => {
    let folderName = "";

    if (env.CANYONLICENSETYPE === "Regular License" && env.CANYON_IS_SINGLE_APP == "true") {
        // Single Regular 
        folderName = "regular-license";
    } else if (env.CANYONLICENSETYPE === "Extended License" && env.CANYON_IS_SINGLE_APP == "true") {
        // Single Extended
        folderName = "regular-license";
    } else if (env.CANYONLICENSETYPE === "Extended License" && env.PAYMENTMETHOD === "chargebee") {
        // Saas Extended Chargebee
        folderName = "extended-license-chargebee";
    } else if (env.CANYONLICENSETYPE === "Extended License" && env.PAYMENTMETHOD === "paddle") {
        // Saas Extended Paddle
        folderName = "extended-license-paddle";
    } else {
        // Saas Regular
        folderName = "extended-license";
    }
    return folderName;
}