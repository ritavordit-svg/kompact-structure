const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const extract = require('extract-zip')
const helperCtr = require("../helper");
const env = require("../../Config/config");


/**
 * Extract Zip
 * @param {String} version 
 * @param {Function} cb 
 */
exports.extractZip = async (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Zip File extraction, FunctionName: extractZip, data: " + version);
        const sourcePath = __dirname + '/../download/update.zip';
        const targetPath = __dirname + '/../../update-'+version;
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
 * Get Folder With Specific Version
 * @param {String} version 
 * @param {Function} cb 
 */
exports.getFolderWithSpecificVersion = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + " Start Get Folder With Specific Version, FunctionName: getFolderWithSpecificVersion, data: " + version);
        let folderName = helperCtr.getFolderName();

        const fileUrl = env.CANYONAPIURL + '/' + version + '/' + folderName + '/update.zip';
        if (!fs.existsSync(__dirname + '/../download')){
            fs.mkdirSync(__dirname + '/../download');
        }
        const fileName = __dirname + '/../download/update.zip';
        const file = fs.createWriteStream(fileName);

        https.get(fileUrl, getZipRes => {
            getZipRes.pipe(file);
            file.on('finish', () => {
                file.close();
                helperCtr.generateLog(version, "info: " + new Date() + " Done Get Folder With Specific Version, FunctionName: getFolderWithSpecificVersion");
                exports.extractZip(version, (data) => {
                    if (!data.status) {
                        helperCtr.generateLog(version, "info: " + new Date() + " Remove Zip File, FunctionName: getFolderWithSpecificVersion, data: " + JSON.stringify(data));
                        fs.unlinkSync(fileName);
                        cb(data);
                        return;
                    }
                    
                    helperCtr.generateLog(version, "info: " + new Date() + " Remove Zip File, FunctionName: getFolderWithSpecificVersion, data: " + JSON.stringify(data));
                    fs.unlinkSync(fileName);
                    cb({
                        status: true,
                        statusText: "Successfully Replace Update Files",
                    });
                });
            });
        }).on('error', error => {
            fs.unlinkSync(fileName);
            helperCtr.generateLog(version, "error: " + new Date() + " Get Folder From Console Domain, FunctionName: getFolderWithSpecificVersion, Error: " + JSON.stringify(error?.message || error));
            cb({
                status: false,
                error: JSON.stringify(error?.message || error)
            });
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + " Get Folder With Specific Version, FunctionName: getFolderWithSpecificVersion, Catch Error: " + (error?.message || error));
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Remove Folder
 * @param {String} sourceFolder Folder Path
 * @param {String} key admin, frontend and api
 * @returns 
 */
exports.removeFolder = (sourceFolder, version, key, cb) => {
    try {
        if (fs.existsSync(sourceFolder)) {
            fs.rm(sourceFolder, {recursive: true, force: true}, (err) => {
                if (err) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Remove ${key} Folder, FunctionName: removeFolder, Error: ${err} Source: ${sourceFolder}`);
                    cb({
                        status: false,
                        error: `Remove ${key} Folder Error: ${err}`
                    });
                    return;
                }
                helperCtr.generateLog(version, "info: " + new Date() + ` Done Remove ${key} Folder Source: ${sourceFolder}, FunctionName: removeFolder`);
                cb({
                    status: true
                });
            });
            return;
        }
        cb({
            status: true,
            statusText: "Folder doesn't exist"
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Remove ${key} Folder, FunctionName: removeFolder, Catch Error: ${error?.message || error} Source: ${sourceFolder}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Files And Folders Replace
 * @param {Boolean} isUpdate 
 * @param {String} version 
 * @param {String} key 
 * @param {Function} cb 
 * @returns 
 */
exports.filesAndFoldersReplace = (isUpdate, version, key, cb) => {
    try {
        let sourceFolder = __dirname + '/../../update-' + version;
        let targetFolder = __dirname + '/../../';
        if (key === "admin") {
            sourceFolder = __dirname + '/../../update-' + version + "/admin";
            targetFolder = __dirname + '/../../admin/';
        }
        if (key === "frontend") {
            sourceFolder = __dirname + '/../../update-' + version + "/frontend";
            targetFolder = __dirname + '/../../frontend/';
        }

        if (!isUpdate) {
            helperCtr.generateLog(version, "info: " + new Date() + ` Start Remove ${key} Folder Source: ${sourceFolder}, FunctionName: filesAndFoldersReplace, data: ${JSON.stringify({isUpdate, version, key})}`);
            exports.removeFolder(sourceFolder, version, key, (removeFolderRes) => {
                cb(removeFolderRes);
            });
            return;
        }


        helperCtr.generateLog(version, "info: " + new Date() + ` Start ${key} Copy Folders and Files, FunctionName: filesAndFoldersReplace, data: ${JSON.stringify({isUpdate, version, key})}`);
        function copyFolderSync(source, target) {
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }
    
            const files = fs.readdirSync(source);
    
            files.forEach((file) => {
                const sourcePath = path.join(source, file);
                const targetPath = path.join(target, file);
    
                if (fs.statSync(sourcePath).isDirectory()) {
                    copyFolderSync(sourcePath, targetPath);
                } else {
                    fs.copyFileSync(sourcePath, targetPath);
                }
            });
        }
        if (fs.existsSync(sourceFolder)) {
            copyFolderSync(sourceFolder, targetFolder)
        }
        
        helperCtr.generateLog(version, "info: " + new Date() + ` Done ${key} Copy Folders and Files, FunctionName: filesAndFoldersReplace`);
        helperCtr.generateLog(version, "info: " + new Date() + ` Start Remove ${key} Folder Source: ${sourceFolder} === ${fs.existsSync(sourceFolder)}, FunctionName: filesAndFoldersReplace`);
        exports.removeFolder(sourceFolder, version, key, (removeFolderRes) => {
            cb(removeFolderRes);
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` File and Folder Replace ${key}, FunctionName: filesAndFoldersReplace, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Generate Build
 * @param {String} version 
 * @param {String} key 
 * @param {*String} targetPath 
 * @param {Function} cb 
 */
exports.generateBuild = (version, key, targetPath, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + ` Start Generate Build in ${key}, FunctionName: generateBuild, data: ${JSON.stringify({version, key, targetPath})}`);
        if (fs.existsSync(targetPath)) {
            let buildCommand = "npm run build";
            if (process.platform === "linux") {
                buildCommand = 'PATH=$(which vue) && $PATH build';
            }
            // Change the current working directory to the Vue project directory
            process.chdir(targetPath);
            // Generate production build
            exec(buildCommand, (buildError, buildStdout) => {
                if (buildError) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Generate Build ${key}, FunctionName: generateBuild, Error: ${buildError}`);
                    cb({
                        status: false,
                        error: buildError
                    });
                    return;
                }
                helperCtr.generateLog(version, "info: " + new Date() + ` Done Generate Build in ${key}, FunctionName: generateBuild`);
                cb({
                    status: true,
                    buildStdout: buildStdout
                });
            });
        } else {
            helperCtr.generateLog(version, "info: " + new Date() + ` Done Generate Build in ${key}, FunctionName: generateBuild`);
            cb({
                status: true
            });
        }
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Generate Build ${key}, FunctionName: generateBuild, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Npm Install Function
 * @param {String} version 
 * @param {String} key 
 * @param {String} targetPath 
 * @param {Function} cb 
 */
exports.npmInstall = (version, key, targetPath, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + ` Start Npm Install in ${key}, FunctionName: npmInstall, data: ${JSON.stringify({version, key, targetPath})}`);
        if (fs.existsSync(targetPath)) {
            const npmInstallCommand = 'npm install --dev';
            // Change the current working directory to the Vue project directory
            process.chdir(targetPath);
    
            // Npm Install
            exec(npmInstallCommand, (npmInstallError, npmInstallStdout) => {
                if (npmInstallError) {
                    helperCtr.generateLog(version, "error: " + new Date() + ` Error Npm Install in ${key}, FunctionName: npmInstall, Error: ${npmInstallError}`);
                    return;
                }
                helperCtr.generateLog(version, "info: " + new Date() + ` Done Npm Install in ${key}, FunctionName: npmInstall`);
                cb({
                    status: true,
                    npmInstallStdout
                });
            });
        } else {
            helperCtr.generateLog(version, "info: " + new Date() + ` Done Npm Install in ${key}, FunctionName: npmInstall`);
            cb({
                status: true
            });
        }
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Npm Install ${key}, FunctionName: npmInstall, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};


/**
 * Npm Install And Generate Build
 * @param {Boolean} isUpdate 
 * @param {String} version 
 * @param {String} key 
 * @param {Function} cb 
 */
exports.npmInstallAndGenerateBuild = (isUpdate, version, key, cb) => {
    try {
        let targetPath = __dirname + '/../../';
        if (key === "admin") {
            targetPath = __dirname + '/../../admin/';
        }
        if (key === "frontend") {
            targetPath = __dirname + '/../../frontend/';
        }
        exports.npmInstall(version, key, targetPath, (npmInstallRes) => {
            if (!npmInstallRes.status) {
                cb(npmInstallRes);
                return;
            }
            if (isUpdate && (key === "admin" || key === "frontend")) {
                exports.generateBuild(version, key, targetPath, (gBuildRes) => {
                    if (!gBuildRes.status) {
                        cb(gBuildRes);
                        return;
                    }
                    cb({
                        status: gBuildRes.status,
                        npmInstallRes: npmInstallRes,
                        generateBuildRes: gBuildRes
                    });
                })
                return;
            }
            cb(npmInstallRes);
        });
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` NPM Install and Generate Build ${key}, FunctionName: npmInstallAndGenerateBuild, Catch Error: ${error?.message || error}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};
