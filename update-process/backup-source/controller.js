const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const pjson = require('../../package.json');
const helperCtr = require('../helper');


/**
 * Backup Project
 * @param {String} version 
 * @param {Function} cb 
 */
exports.backupProject = (version, cb) => {
    try {
        helperCtr.generateLog(version, "info: " + new Date() + ` Start Project Backup, FunctionName: backupProject, data: ${version}`);
        // Create a file to stream archive data to
        const generateZipFileName = `backup-project-${pjson.version}.zip`;
        const output = fs.createWriteStream(generateZipFileName);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set the compression level
        });

        // Listen for all archive data to be written
        output.on('close', function () {
            helperCtr.generateLog(version, "info: " + new Date() + ` Done Project Backup, FunctionName: backupProject`);
            helperCtr.generateLog(version, "info: " + new Date() + " Done Project Backup " + archive.pointer() + ' total bytes');
            cb({
                status: true,
                data: archive.pointer() + ' total bytes'
            });
        });

        // Catch warnings or errors
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                helperCtr.generateLog(version, "error: " + new Date() + ` Warning Project Backup, FunctionName: backupProject, error: ${err}`);
                cb({
                    status: true,
                    data: err
                });
            } else {
                helperCtr.generateLog(version, "error: " + new Date() + ` Warning Project Backup, FunctionName: backupProject, error: ${err}`);
                cb({
                    status: true,
                    data: err
                });
            }
        });

        archive.on('error', function (err) {
            helperCtr.generateLog(version, "error: " + new Date() + ` Error Project Backup, FunctionName: backupProject, error: ${err}`);
            cb({
                status: false,
                error: err
            });
        });

        // Pipe archive data to the output file
        archive.pipe(output);

        // Append the entire project directory, excluding node_modules
        const projectDir = __dirname + "/../../"; // Current project directory

        archive.glob('**/*', {
            cwd: projectDir,
            ignore: [
                'node_modules/**',
                'log/**',
                '.git/**',
                'frontend/node_modules/**',
                'admin/node_modules/**',
                '**.zip'
            ] // Ignore node_modules, .git, and output ZIP
        });

        // Explicitly add the .env file to the archive
        archive.file(path.join(projectDir, '.env'), { name: '.env' });
        archive.file(path.join(projectDir+'frontend/', '.env'), { name: 'frontend/.env' });
        if (fs.existsSync(projectDir+'admin/.env')) {
            archive.file(path.join(projectDir+'admin/', '.env'), { name: 'admin/.env' });
        }
        // Finalize the archive (i.e., no more files will be added)
        archive.finalize();
    } catch (error) {
        helperCtr.generateLog(version, "error: " + new Date() + ` Error Project Backup Catch, FunctionName: backupProject, error: ${(error?.message || error)}`);
        cb({
            status: false,
            error: error?.message || error
        });
    }
};
