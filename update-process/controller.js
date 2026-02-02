const fs = require("fs");
const axios = require("axios");
const replaceSourceCtr = require("./replace-source/controller");
const backupSourceCtr = require("./backup-source/controller");
const migrationQueryCtr = require("./migration-query/controller");
const { emitListener } = require("./eventController.js");
const updateEnvCtr = require("./update-env/controller");
const helperCtr = require("./helper");
const serviceFunction = require("../Modules/serviceFunction");
const packJOSNData = require("../package.json");

const finalUpdateMeta = {
    "version": "10.15.5",
    "webUpdate": true,
    "apiUpdate": true,
    "adminUpdate": true,
    "envUpdate": ["9.0.2", "10.6.14"],
    "dbMigration": ["10.15.5"]
}


/**
 * Prepare Final Build
 * @param {Object} data 
 * @param {Function} cb 
 */
exports.prepareFinalBuild = (data, cb) => {
    try {
        helperCtr.generateLog(data.version, "info: " + new Date() + ` Start Prepare Final Build, FunctionName: prepareFinalBuild`);
        replaceSourceCtr.npmInstallAndGenerateBuild(data.adminUpdate, data.version, 'admin', (adminNBGRes) => {
            if (!adminNBGRes.status) {
                cb(adminNBGRes);
                return;
            }
            replaceSourceCtr.npmInstallAndGenerateBuild(true, data.version, 'frontend', (frontEndNBGRes) => {
                if (!frontEndNBGRes.status) {
                    cb(frontEndNBGRes);
                    return;
                }
                replaceSourceCtr.npmInstallAndGenerateBuild(data.apiUpdate, data.version, 'api', (apiNBGRes) => {
                    if (!apiNBGRes.status) {
                        cb(apiNBGRes);
                        return;
                    }
                    helperCtr.generateLog(data.version, "info: " + new Date() + ` Done Prepare Final Build, FunctionName: prepareFinalBuild`);
                    cb({
                        status: true,
                        adminNBGRes: adminNBGRes,
                        frontEndNBGRes: frontEndNBGRes,
                        apiNBGRes: apiNBGRes
                    });
                });
            });
        });
    } catch (error) {
        helperCtr.generateLog(data.version, "error: " + new Date() + ` Prepare Final Build, FunctionName: prepareFinalBuild, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Replace Latest Code
 * @param {Object} data 
 * @param {Function} cb 
 */
exports.replaceLatestCode = (data, cb) => {
    try {
        helperCtr.generateLog(data.version, "info: " + new Date() + " Start Replace Latest Code, FunctionName: replaceLatestCode");
        replaceSourceCtr.getFolderWithSpecificVersion(data.version, (getSourceData) => {
            if (!getSourceData.status) {
                cb(getSourceData);
                return;
            }

            replaceSourceCtr.filesAndFoldersReplace(data.adminUpdate, data.version, 'admin', (adminUpdateRes) => {
                if (!adminUpdateRes.status) {
                    cb(adminUpdateRes);
                    return;
                }
                replaceSourceCtr.filesAndFoldersReplace(data.webUpdate, data.version, 'frontend', (frontendUpdateRes) => {
                    if (!frontendUpdateRes.status) {
                        cb(frontendUpdateRes);
                        return;
                    }
                    replaceSourceCtr.filesAndFoldersReplace(data.apiUpdate, data.version, 'api', (apiUpdateRes) => {
                        if (!apiUpdateRes.status) {
                            cb(apiUpdateRes);
                            return;
                        }
                        helperCtr.generateLog(data.version, "info: " + new Date() + " Done Replace Latest Code, FunctionName: replaceLatestCode");
                        cb({
                            status: true,
                            adminUpdateRes: adminUpdateRes,
                            frontendUpdateRes: frontendUpdateRes,
                            apiUpdateRes: apiUpdateRes,
                            statusText: "All Folder and Files Replacement successfully."
                        });
                    });
                });
            });
        });
    } catch (error) {
        helperCtr.generateLog(data.version, "error: " + new Date() + ` Replace Latest Code, FunctionName: replaceLatestCode, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Backup Old Code
 * @param {String} version 
 * @param {Function} cb 
 */
exports.backupOldCode = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Backup Old Code, FunctionName: backupOldCode");
        backupSourceCtr.backupProject(version, (getBackupData) => {
            if (!getBackupData.status) {
                cb(getBackupData);
                return;
            }
            helperCtr.generateLog(version, "info: " + new Date() + " Done Backup Old Code, FunctionName: backupOldCode");            
            cb({
                status: true,
                statusText: "All Folder and Files Backup successfully.",
                getBackupData: getBackupData
            });
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Backup Old Code, FunctionName: backupOldCode, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Migration Query Code
 * @param {Object} data 
 * @param {Function} cb 
 */
exports.migrationQueryCode = (data, cb) => {
    try {
        helperCtr.generateLog(data.version, "info: " + new Date() + " Start Migration Query Code, FunctionName: migrationQueryCode");
        migrationQueryCtr.createMigrateMongoConfigFile(data.version, (configFile) => {
            if (!configFile.status) {
                cb(configFile);
                return;
            }
            migrationQueryCtr.createMigrateMongoFolder(data.version, (configFolder) => {
                if (!configFolder.status) {
                    cb(configFolder);
                    return;
                }
                migrationQueryCtr.createMigrationQueryFile(data.version, data.dbMigration, (createMQFileData) => {
                    if (!createMQFileData.status) {
                        cb(createMQFileData);
                        return;
                    }
                    migrationQueryCtr.finalRunQuery(data.version, (finalRunQData) => {
                        if (!finalRunQData.status) {
                            cb(finalRunQData);
                            return;
                        }
                        helperCtr.generateLog(data.version, "info: " + new Date() + " Done Migration Query Code, FunctionName: migrationQueryCode");
                        cb({
                            status: true,
                            statusText: "Migration Query successfully.",
                            configFile: configFile,
                            configFolder: configFolder,
                            createMQFileData: createMQFileData,
                            finalRunQData: finalRunQData
                        });
                    });
                });
            });
        })
    } catch (error) {
        helperCtr.generateLog(data.version, "error: " + new Date() + ` Migration Query Code, FunctionName: migrationQueryCode, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * 
 */
exports.removeExtraFilesAndFolders = async (version, cb) => {
        try {
            helperCtr.generateLog(version, "info: " + new Date() + `Start - Remove Extra File And Folder`);
            const foldersToDelete = [
                __dirname + "/../migrations"
            ];
            const filesToDelete = [
                __dirname + "/../migrate-mongo-config.js",
                __dirname + "/./version.json",
            ];
        
            let removeFileCount = 0;
            let isRemoveFileError = false;
            const removeFile = (filePath) => {
                if (removeFileCount >= filesToDelete.length) {
                    if (isRemoveFileError) {
                        cb({
                            status: false,
                            error: "File Remove Error"
                        });
                        return;
                    }
                    cb({
                        status: true
                    });
                    return;
                }

                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            isRemoveFileError = true;
                            removeFileCount = filesToDelete.length;
                            removeFile(filesToDelete[removeFileCount]);
                            return;
                        };
                        removeFileCount += 1;
                        removeFile(filesToDelete[removeFileCount]);
                    });
                } else {
                    removeFileCount += 1;
                    removeFile(filesToDelete[removeFileCount]);
                }
            }

            let removeFolderCount = 0;
            let isRemoveFolderError = false;
            const removeFolder = (folderPath) => {
                if (removeFolderCount >= foldersToDelete.length) {
                    if (isRemoveFolderError) {
                        cb({
                            status: false,
                            error: "Folder Remove Error"
                        });
                        return;
                    }
                    removeFile(filesToDelete[removeFileCount]);
                    return;
                }
                fs.rm(folderPath, { recursive: true, force: true }, (error) => {
                    console.log("error", error)
                    if (error) {
                        isRemoveFolderError = true;
                        removeFolderCount = foldersToDelete.length;
                    } else {
                        removeFolderCount += 1;
                        removeFolder(foldersToDelete[removeFolderCount]);
                    }
                })
                
            }
            removeFolder(foldersToDelete[removeFolderCount]);
        } catch (error) {
            helperCtr.generateLog(version, "error: " + new Date() + ` Remove Extra File And Folder, FunctionName: removeExtraFilesAndFolders, Catch Error: ${error?.message || error}`);
            cb({
                status: false,
                error: error?.message || error
            });
        }
};


/**
 * updateSubmit
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateEnvSubmit = (req, res) => {
    const bodyData = req.body;
    try {
        updateEnvCtr.updateEnvProcess(bodyData.envFromData, bodyData.versionUpdate.finalVersionObj.envUpdate, (envData) => {
            if (!envData.status) {
                res.json(envData);
                return;
            }

            serviceFunction.updateUnderMaintenance(true, (uMData) => {
                if (!uMData.status) {
                    res.json({
                        status: false,
                        envData,
                        uMData
                    });
                    return;
                }
                packJOSNData.version = bodyData.versionUpdate.finalVersionObj.version;
                console.log("packJOSNData.version", packJOSNData.version);
                console.log("packJOSNData", packJOSNData);
                // Update Package JSON File
                fs.writeFile(__dirname + "/../package.json", JSON.stringify(packJOSNData, null, 2), "utf8", (err, data) => {
                    if (err) {
                        helperCtr.generateLog(bodyData.versionUpdate.finalVersionObj.version, "error: " + new Date() + ` Update Package Json File Error: ${err}`);
                        res.json({
                            status: false,
                            error: `Update Package Json File Error: ${err}`
                        });
                        return;
                    }

                    // Create a Version File 
                    fs.writeFile(__dirname + "/./version.json", JSON.stringify(bodyData.versionUpdate, null, 4), "utf8", (err, data) => {
                        if (err) {
                            helperCtr.generateLog(bodyData.versionUpdate.finalVersionObj.version, "error: " + new Date() + ` Create a version File Error: ${err}`);
                            res.json({
                                status: false,
                                error: `Create a version File Error: ${err}`
                            });
                            return;
                        }
                        res.json({
                            status: true,
                            envData,
                            uMData
                        });
                        helperCtr.restartServer();
                    });
                    
                })
            });
        });
    } catch (error) {
        helperCtr.generateLog(bodyData.versionUpdate.finalVersionObj.version, "error: " + new Date() + ` Migration Query Code, FunctionName: updateEnvSubmit, Catch Error: ${error?.message || error}`);
        res.json({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Final Upgrade Process
 * @param {Object} req 
 * @param {Object} res 
 */
exports.finalupgradeprocess = (req, res) => {
    const bodyData = req.body;
    setTimeout(() => {
        helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Start Process For Backup Existing Project");
        setTimeout(() => {
            exports.backupOldCode(packJOSNData.version, (bData) => {
                if (!bData.status) {
                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For Backup Existing Project");
                    emitListener(bodyData?.eventId, {step: "STOP", error: bData.error || "Project Backup Error"});
                    res.status(200).json(bData);
                    return;
                }
                helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Done Process For Backup Existing Project");
                setTimeout(() => {
                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Start Process For Update App with Latest Version");
                    emitListener(bodyData?.eventId, {step: 1});
                    const replaceObj = {
                        version: packJOSNData.version,
                        adminUpdate: bodyData.versionData.finalVersionObj.adminUpdate,
                        webUpdate: bodyData.versionData.finalVersionObj.webUpdate,
                        apiUpdate: bodyData.versionData.finalVersionObj.apiUpdate,
                    }
                    exports.replaceLatestCode(replaceObj, (uData) => {
                        if (!uData.status) {
                            helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For Update App with Latest Version");
                            emitListener(bodyData?.eventId, {step: "STOP", error: uData.error || "Update app with latest version Error"});
                            res.status(200).json(uData);
                            return;
                        }
                        helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Done Process For Update App with Latest Version");
                        setTimeout(() => {
                            helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Start Process For Generate Build");
                            emitListener(bodyData?.eventId, {step: 2});
                            exports.prepareFinalBuild(replaceObj, (pFBRes) => {
                                if (!pFBRes.status) {
                                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For Generate Build");
                                    emitListener(bodyData?.eventId, {step: "STOP", error: pFBRes.error || "Generate Build Error"});
                                    res.status(200).json(pFBRes);
                                    return;
                                }
                                helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Done Process For Generate Build");
                                setTimeout(() => {
                                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Start Process For DB Migration");
                                    emitListener(bodyData?.eventId, {step: 3});
                                    const migrationObj = {
                                        version: packJOSNData.version,
                                        dbMigration: bodyData.versionData.finalVersionObj.dbMigration
                                    }
                                    exports.migrationQueryCode(migrationObj, (mqRes) => {
                                        if (!mqRes.status) {
                                            helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For DB Migration");
                                            emitListener(bodyData?.eventId, {step: "STOP", error: mqRes.error || "Run Migration Query Error"});
                                            res.status(200).json(mqRes);
                                            return;
                                        }
                                        helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Done Process For DB Migration");
                                        setTimeout(() => {
                                            helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Start Process For Verifying updates");
                                            emitListener(bodyData?.eventId, {step: 4});
                                            exports.removeExtraFilesAndFolders(packJOSNData.version, (rffRes) => {
                                                if (!rffRes.status) {
                                                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For Verifying updates");
                                                    emitListener(bodyData?.eventId, {step: "STOP", error: rffRes.error || "Remove Extra File and Folder Error"});
                                                    res.status(200).json(rffRes);
                                                    return;
                                                }
                    
                                                const statusUpdateData = {
                                                    productionUrl: req.get('Origin'),
                                                    licenseId: process.env.CANYONLICENSEID,
                                                    version: "v" + packJOSNData.version,
                                                    updateStatus: 2
                                                }
                                                axios.post(`${process.env.CANYONAPIURL}/api/v1/updateProductionStatus`, statusUpdateData, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                    }
                                                })
                                                .then(() => {}).catch(() => {});
                    
                                                serviceFunction.updateUnderMaintenance(false, (uMData) => {
                                                    if (!uMData.status) {
                                                        helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Error Process For Verifying updates");
                                                        emitListener(bodyData?.eventId, {step: "STOP", error: uMData.error || "Update Under Maintenance var Error"});
                                                        res.status(200).json(uMData);
                                                        return;
                                                    }
                                                    helperCtr.generateLog(packJOSNData.version, "info: " + new Date() + " Done Process For Verifying updates");
                                                    setTimeout(() => {
                                                        emitListener(bodyData?.eventId, {step: "STOP"});
                                                        emitListener('read-log-' + packJOSNData.version, {step: "STOP"});
                                                        res.status(200).json({...bodyData});
                                                        setTimeout(() => {
                                                            helperCtr.restartServer();
                                                        }, 1000);
                                                    }, 2000)
                                                });
                                            });
                                        }, 2000);
                
                                        // setTimeout(() => {
                                        //     helperCtr.generateLog("10.15.5", "info: " + new Date() + " Start Step 5");
                                        //     setTimeout(() => {
                                        //         helperCtr.generateLog("10.15.5", "info: " + new Date() + " Done Step 5");
                                        //         emitListener(bodyData?.eventId, {step: "STOP"});
                                        //     }, 1000);
                                        // }, 10000);
                                        // setTimeout(() => {
                                        //     emitListener('read-log-' + "10.15.5", {step: "STOP"});
                                        //     res.status(200).json({...bodyData});
                                        // }, 12000);
                                    })
                                }, 2000);
                                // setTimeout(() => {
                                //     helperCtr.restartServer();
                                // }, 2000)
                            })
                        }, 2000);
                    });
                }, 2000);
            });
        }, 2000);
    }, 2000);
}
