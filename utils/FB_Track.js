const {appendFile} = require("fs");
const logger = require("../Config/loggerConfig");
const fileName = `trackFile.log`;

function writeUpdate(fn, log, cb) {
    logger.warn(log);
    appendFile(`${__dirname}/TRACK/${fn}`, log, (err) => {
        if(err) {
            cb(err)
            return
        }
        cb();
    });
}

let inProcess = false;
let queue = [];

function processQueue() {
    if(queue.length) {
        exports.readUpdate(queue.splice(0, 5).join("\n"), true);
    }
}

exports.readUpdate = (data, prepared = false) => {
    return new Promise(async(resolve, reject) => {
        if(inProcess) {
            queue.push(`TS: ${new Date().toString()} | type: ${data.type} > path: ${data.path} > size: ${data.size} MB`)
            resolve("QUEUE")
            return;
        }
        inProcess = true;
        try {
            let dt = new Date();
            let time = `${dt.toDateString()}`;
            const fn = `${time}_${fileName}`;
            let log = ''
            if(prepared) {
                log = '\n'+data
            } else {
                log = `\nTS: ${new Date().toString()} | type: ${data.type} > path: ${data.path} > size: ${data.size} MB`
            }
            writeUpdate(fn, log, (err) => {
                if(err) {
                    inProcess = false;
                    processQueue();
                    reject(err);
                } else {
                    inProcess = false;
                    processQueue();
                    resolve()
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}