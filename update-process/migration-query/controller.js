const { exec } = require('child_process');
const fs = require("fs");
const path = require('path');
const https = require('https');
const extract = require('extract-zip')
const helperCtr = require("../helper");
const fileData = require("./migrate-mongo-config");
const env = require("../../Config/config");


/**
 * Create Migrate Mongo Config File
 * @param {String} version 
 * @param {Function} cb 
 */
exports.createMigrateMongoConfigFile = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Create Migrate Mongo Config File, FunctionName: createMigrateMongoConfigFile, data: " + version);
        const path = __dirname + "/../../migrate-mongo-config.js";
        fs.writeFile(path, fileData.fileData(), (err, wData) => {
            if (err) {
                helperCtr.generateLog(version, "error: " + new Date() + ` File Migration mongo confilg, FunctionName: createMigrateMongoConfigFile, Create Issue: ${path} : Error: ${err}`);
                cb({
                    status: false,
                    error: `File Migration mongo confilg Create Issue: ${path} : Error: ${err}`
                });
                return;
            }
            helperCtr.generateLog(version, "info: " + new Date() + " Done Create Migrate Mongo Config File, FunctionName: createMigrateMongoConfigFile");
            cb({
                status: true
            });
        })
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Create Migrate Mongo Config File, FunctionName: createMigrateMongoConfigFile, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Create Migrate Mongo Folder
 * @param {String} version 
 * @param {Function} cb 
 */
exports.createMigrateMongoFolder = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Create Migrate Mongo Folder, FunctionName: createMigrateMongoFolder, data: " + version);
        const path = __dirname + "/../../migrations";
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
            helperCtr.generateLog(version, "info: " + new Date() + " Done Create Migrate Mongo Folder, FunctionName: createMigrateMongoFolder");
            cb({
                status: true
            });
        } else {
            helperCtr.generateLog(version, "info: " + new Date() + " Already Exists Create Migrate Mongo Folder, FunctionName: createMigrateMongoFolder");
            cb({
                status: true
            });
        }
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Create Migrate Mongo Folder, FunctionName: createMigrateMongoFolder, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Extract Zip
 * @param {String} version 
 * @param {Function} cb 
 */
exports.extractZip = async (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Zip File extraction, FunctionName: extractZip, data: " + version);
        const sourcePath = __dirname + '/../../migrations/migration.zip';
        const targetPath = __dirname + '/../../migrations';
        await extract(sourcePath, { dir: targetPath })
        helperCtr.generateLog(version, "info: " + new Date() + " Done Zip File extraction, FunctionName: extractZip");
        cb({
            status: true
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Zip Extract, FunctionName: extractZip, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Get File From Server
 * @param {String} version 
 * @param {String} mVersion 
 * @param {Function} cb 
 */
exports.getFileFromServer = (version, mVersion, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Get File From Server, FunctionName: getFileFromServer, data: " + JSON.stringify({version, mVersion}));
        const folderName = helperCtr.getFolderName();
        const fileUrl = env.CANYONAPIURL + '/' + mVersion + '/' + folderName + '/migration.zip';
        if (!fs.existsSync(__dirname + '/../../migrations')){
            fs.mkdirSync(__dirname + '/../../migrations');
        }
        const fileName = __dirname + '/../../migrations/migration.zip';
        const file = fs.createWriteStream(fileName);
        https.get(fileUrl, getZipRes => {
            if (getZipRes.statusCode !== 200) {
                file.close();
                fs.unlinkSync(fileName);
                helperCtr.generateLog(version, "info: " + new Date() + ` Failed to download file. FunctionName: getFileFromServer, HTTP Status Code: ${getZipRes.statusCode}`);
                helperCtr.generateLog(version, "error: " + new Date() + ` Get File From Server, FunctionName: getFileFromServer, Error: ${getZipRes.statusCode}`);
                cb({
                    status: false,
                    error: ` Failed to download file. HTTP Status Code: ${getZipRes.statusCode}`
                });
                return;
            }
            getZipRes.pipe(file);
            file.on('finish', () => {
                file.close();
                helperCtr.generateLog(version, "info: " + new Date() + " Done Get File From Server, FunctionName: getFileFromServer");
                exports.extractZip(version, (data) => {
                    if (!data.status) {
                        helperCtr.generateLog(version, "info: " + new Date() + " Remove Zip File, FunctionName: getFileFromServer, data: " + JSON.stringify(data));
                        fs.unlinkSync(fileName);
                        cb(data);
                        return;
                    }
                    
                    helperCtr.generateLog(version, "info: " + new Date() + " Remove Zip File, FunctionName: getFileFromServer, data: " + JSON.stringify(data));
                    fs.unlinkSync(fileName);
                    cb({
                        status: true,
                        statusText: "Migrations Generate File Successfully"
                    });
                });
            });
        }).on('error', error => {
            fs.unlinkSync(fileName);
            helperCtr.generateLog(version, "error: " + new Date() + " Get Folder From Console Domain, FunctionName: getFileFromServer, Error: " + JSON.stringify(error?.message || error));
            cb({
                status: false,
                error: JSON.stringify(error?.message || error)
            });
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Get File From Server, FunctionName: getFileFromServer, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Create Migration Query File
 * @param {String} version 
 * @param {Array} dbMigration 
 * @param {Function} cb 
 * @returns 
 */
exports.createMigrationQueryFile = (version, dbMigration, cb) => {
    try {
        let isAllGood = true;
        helperCtr.generateLog(version, "info: " + new Date() + " Start Create Migration Query File, FunctionName: createMigrationQueryFile, data: " + JSON.stringify({version, dbMigration}));
        if (!(dbMigration && dbMigration.length)) {
            helperCtr.generateLog(version, "info: " + new Date() + " No Found Create Migration Query File, FunctionName: createMigrationQueryFile");
            helperCtr.generateLog(version, "info: " + new Date() + " Done Create Migration Query File, FunctionName: createMigrationQueryFile");
            cb({
                status: true
            })
            return;
        }
        let count = 0;
        const countFun = (dRow) => {
            if (count >= dbMigration.length) {
                if (isAllGood) {
                    helperCtr.generateLog(version, "info: " + new Date() + " Done Create Migration Query File, FunctionName: createMigrationQueryFile");
                    cb({
                        status: true
                    });
                } else {
                    helperCtr.generateLog(version, "error: " + new Date() + " Error Create Migration Query File, FunctionName: createMigrationQueryFile");
                    cb({
                        status: false,
                        error: "Migration is Failed"
                    });
                }
                return;
            }
            exports.getFileFromServer(version, dRow, (fileData) => {
                if (!(fileData && fileData.status)) {
                    isAllGood = false;
                    count = dbMigration.length;
                    countFun(dbMigration[count]);
                    return;
                }
                count += 1;
                countFun(dbMigration[count]);
            });
        };
        countFun(dbMigration[count]);
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Create Migration Query File, FunctionName: createMigrationQueryFile, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Final Run Query
 * @param {String} version 
 * @param {Function} cb 
 */
exports.finalRunQuery = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + ` Start Final Run Query, FunctionName: finalRunQuery, data: ${version}`);
        const targetPath = __dirname + "/../../"
        if (fs.existsSync(targetPath)) {
            let queryCommand = "npx migrate-mongo up";
            // Change the current working directory to the Vue project directory
            process.chdir(targetPath);
            // Generate production build
            exec(queryCommand, (queryError, queryStdout) => {
                if (queryError) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Final Run Query, FunctionName: finalRunQuery, Error: ${queryError}`);
                    cb({
                        status: false,
                        error: queryError
                    });
                    return;
                }
                helperCtr.generateLog(version, "info: " + new Date() + ` Done Final Run Query, FunctionName: finalRunQuery`);
                cb({
                    status: true,
                    queryStdout: queryStdout
                });
            });
        } else {
            helperCtr.generateLog(version, "info: " + new Date() + ` Done Final Run Query, FunctionName: finalRunQuery`);
            cb({
                status: true
            });
        }
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Final Run Query, FunctionName: finalRunQuery, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};
