const fs = require('fs');
const helperCtr = require("../helper");
const serviceFunCtr = require("../../Modules/serviceFunction");


/**
 * Update File Env
 * @param {String} version 
 * @param {String} path 
 * @param {String} data 
 * @param {String} key 
 * @param {Function} cb 
 * @returns 
 */
exports.updateFileEnv = (version, path, data, key, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Update Env File " + key + ", FunctionName: updateFileEnv, data: " + JSON.stringify({version, path, data, key}));
        if (!data) {
            helperCtr.generateLog(version, "info: " + new Date() + " Done Update Env File " + key + ", FunctionName: updateFileEnv");
            cb(true);
            return;
        }
        if (!fs.existsSync(path)) {
            fs.writeFile(path, data, (err, wData) => {
                if (err) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Update Env File ${key}, FunctionName: updateFileEnv,  Catch Error: ` + err);
                    cb(false);
                    return;
                }
                helperCtr.generateLog(version, "info: " + new Date() + " Done Update Env File " + key + ", FunctionName: updateFileEnv");
                cb(true);
            });
        } else {
            fs.appendFile(path, '\n'+data, function (err) {
                if (err) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Update Env File ${key}, FunctionName: updateFileEnv, Catch Error: ` + err);
                    cb(false);
                };
                helperCtr.generateLog(version, "info: " + new Date() + " Done Update Env File " + key + ", FunctionName: updateFileEnv");
                cb(true);
            });
        }
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Update Env File ${key}, FunctionName: updateFileEnv, Catch Error: ` + (error?.message || error));
        cb(false);
    }
};


/**
 * Update Env Process
 * @param {Object} bodyData 
 * @param {Function} cb 
 * @returns 
 */
exports.updateEnvProcess = (bodyData, isUpdate, cb) => {
    try {
        helperCtr.generateLog(bodyData.version, "info: " + new Date() + " Start Update Env, FunctionName: updateEnvProcess, data: " + JSON.stringify(bodyData));
        if (!isUpdate) {
            cb({
                status: true,
                statusText: "No data changes."
            });
            return;
        }
        if (!(bodyData && bodyData.finalValue && Object.keys(bodyData.finalValue).length)) {
            cb({
                status: false,
                error: "Please provide a valid data." 
            });
            return;
        }
        let apiVars = "";
        let frontVars = "";
        let adminVars = "";
        
        for (const [key, value] of Object.entries(bodyData.finalValue)) {
            if (bodyData.finalValue[key].addEnv.indexOf("api") !== -1) {
                apiVars += `${key}="${bodyData.finalValue[key].value}"\n`;
            }
            if (bodyData.finalValue[key].addEnv.indexOf("frontend") !== -1) {
                frontVars += `VUE_APP_${key}="${bodyData.finalValue[key].value}"\n`;
            }
            if (bodyData.finalValue[key].addEnv.indexOf("admin") !== -1) {
                adminVars += `VUE_APP_${key}="${bodyData.finalValue[key].value}"\n`;
            }
        }

        const itemA = (raw, itemCB) => {
            if (raw === "api") {
                const filePath = __dirname + "/../../.env";
                exports.updateFileEnv(bodyData.version, filePath, apiVars, raw, (uData) => {
                    itemCB(uData);
                });
            }
            if (raw === "frontend") {
                const filePath = __dirname + "/../../frontend/.env";
                exports.updateFileEnv(bodyData.version, filePath, frontVars, raw, (uData) => {
                    itemCB(uData);
                });
            }
            if (raw === "admin") {
                const filePath = __dirname + "/../../admin/.env";
                exports.updateFileEnv(bodyData.version, filePath, adminVars, raw, (uData) => {
                    itemCB(uData);
                });
            }
        };
        
        const iteamACallback = (resData) => {
            if (resData.indexOf(false) !== -1) {
                helperCtr.generateLog(bodyData.version, "error: " + new Date() + " Update Env, FunctionName: updateEnvProcess, Error: ");
                cb({
                    status: false,
                    error: "Env File Update Error"
                });
                return;
            }
            helperCtr.generateLog(bodyData.version, "info: " + new Date() + " Done Update Env, FunctionName: updateEnvProcess");
            cb({
                status: true,
                apiVars,
                frontVars,
                adminVars
            });
        };
        serviceFunCtr.customParaller(["admin", "frontend", "api"], itemA, iteamACallback);
    } catch (error) {
        helperCtr.generateLog(bodyData.version, "error: " + new Date() + " Update Env, FunctionName: updateEnvProcess, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};
