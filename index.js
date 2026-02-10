const express = require("express");
const fs = require("fs");
var cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const config =  require('./Config/config.js');
const awsRef =  require('./Config/aws.js');
const logger = require("./Config/loggerConfig");
const packJOSNData = require("./package.json");
const { makeDefaultBrandSettings } = require("./Modules/Admin/common/controller.js");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));

// Set Maintenance Mode
if (!config.UNDER_MAINTENANCE || config.UNDER_MAINTENANCE == "false") {
    app.use(express.static(path.join(__dirname, './frontend/dist')));
    app.use(express.static(path.join(__dirname, './installation/dist')));
    app.use(express.static(path.join(__dirname, './admin/dist')));
    // RUN FRONTEND SERVER
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
    });
    // RUN ADMIN SERVER
    app.get("/admin", (req, res) => {
        res.sendFile(path.join(__dirname, './admin/dist/index.html'));
    });

    // app.get("/installation", (req, res) => {
    //     res.sendFile(path.join(__dirname, './installation/dist/index.html'));
    // });
} else {
    // RUN UNDER MAINTENANCE SERVER
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, './under-maintenance/index.html'));
    });
    const versionData = require("./update-process/version.json");
    app.get("/upgrade", (req, res) => {
        res.sendFile(path.join(__dirname, './under-maintenance/upgrade.html'), { headers: { 'x-app-version':  packJOSNData.version, 'x-app-version-data': JSON.stringify(versionData)} });
    });

    app.use(express.static(path.join(__dirname, 'under-maintenance')));
    app.use(express.static(path.join(__dirname, 'log')));
    app.use((req, res, next) => {
        if (req.path === "/api/v1/finalupgradeprocess"
            || req.path.indexOf("/api/v1/upgradeProcess/events") !== -1
            || req.path.indexOf("/api/v1/realLog/events") !== -1
        ) {
            return next(); // Continue to the next middleware or route handler
        }
        res.sendFile(path.join(__dirname, './under-maintenance/index.html'));
    })
}

// ADD DEFAULT BRAND SETTINGS
makeDefaultBrandSettings()
.catch((error) => {
    console.log("makeDefaultBrandSettings: ", error);
});

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.use('/storage', express.static(path.join(__dirname, 'storage')));

function initializeControllers() {
    const envFile = fs.readFileSync(__dirname + "/.env");
    const envConfig = require('dotenv').parse(envFile);
    envConfig.PORT = Number(envConfig.PORT);
    envConfig.NOOFPRESETCOMPANY = Number(envConfig.NOOFPRESETCOMPANY);
    const tmpStorage = envConfig.STORAGE_TYPE;
    if (!tmpStorage) {
        envConfig.STORAGE_TYPE = "wasabi";
    }
    for (const key in envConfig) {
        process.env[key] = envConfig[key];
        if (key === "APIKEY" || key === "AUTODOMAIN" || key === "PROJECTID" || key === "STORAGEBUCKET" || key === "MESSAGINGSENDERID" || key === "APPID" || key === "MEASUREMENTID") {
            config["FIREBASE_"+key] = envConfig[key];
        } else {
            config[key] = envConfig[key];
            if (key === "WASABI_ACCESS_KEY") {
                awsRef.wasabiAccessKey = envConfig["WASABI_ACCESS_KEY"];
            } else if (key === "WASABI_SECRET_ACCESS_KEY") {
                awsRef.wasabiSecretAccessKey = envConfig["WASABI_SECRET_ACCESS_KEY"];
            } else if (key === "WASABIENDPOINT") {
                awsRef.wasabiEndPoint = envConfig["WASABIENDPOINT"];
            } else if (key === "WASABI_REGION") {
                awsRef.region = envConfig["WASABI_REGION"];
            } else if (key === "IAM_ENDPOINT") {
                awsRef.iamEndPoint = envConfig["IAM_ENDPOINT"];
            } else if (key === "USERPROFILEBUCKET") {
                awsRef.userProfileBucket = envConfig["USERPROFILEBUCKET"];
            } else if (key === "WASABI_USERID") {
                awsRef.wasabiUserId = envConfig["WASABI_USERID"];
            }
        }
    }
    const { startInterval } = require("./middlewares/mongoConnector/helper.js");
    startInterval();
    const { currentDirectory } = require(`./common-storage/common-${process.env.STORAGE_TYPE}.js`);
    const { preCompanySetup, } = require("./Modules/Company/controller2.js");
    app.get("/api/v1/setPresetCompany/:id", (req, res) => {
        if (req.params && req.params.id && req.params.id === config.PRECOMPANYKEY) {
            preCompanySetup();
            res.send('Preset Company Process Start Successful');
        } else {
            res.send('Unauthorized');
        }
    })
    //IMPORT CUSTOM FILES
    require('./Modules/auth/init').init(app);
    require('./Modules/import_settings/init').init(app);
    if (process.env.PAYMENTMETHOD) {
        try {
            require(`./Modules/${process.env.PAYMENTMETHOD}/init`).init(app);
        } catch (error) {
            logger.error(`Payment File is not Found: ${error} `);
        }
    }
    // require('./Modules/remove-sprint-operations/init').init(app);
    require('./Modules/Company/init.js').init(app);
    if(process.env.NODE_ENV === "production") {
        require('./cron.js')
    }
    require('./Modules/Admin/admin.js').init(app);
    require(`./Modules/storage/${currentDirectory}/init`).init(app);
    require('./Modules/usersModule/init').init(app);
    require('./update-process/router').init(app);
    require('./Modules/settings/settingCurrency/init').init(app);
    require('./Modules/settings/settingNotifications/init').init(app);
    require('./Modules/settings/templates/init').init(app);
    require('./Modules/settings/ProjectStatusTemplate/init').init(app);
    require('./Modules/settings/securityPermissions/init').init(app);
    require('./Modules/settings/restrictedExtensions/init').init(app);
    require('./Modules/UserId/init').init(app);
    require('./Modules/settings/Members/init').init(app);
    require('./Modules/Apps/init').init(app)
    require('./Modules/settings/Category/init').init(app);
    require('./Modules/settings/Roles/init').init(app);
    require('./Modules/settings/Designation/init').init(app);
    require('./Modules/settings/CompanyUserStatus/init').init(app);
    require('./Modules/settings/fileExtensions/init').init(app);
    require('./Modules/settings/commonDateFormate/init').init(app);
    require('./Modules/settings/taskPriority/init').init(app);
    require('./Modules/settings/ReactionEmoji/init').init(app);
    require('./Modules/settings/settingMilestone/init').init(app);
    require("./Modules/generateMongoId/init").init(app);
    require("./Modules/UserDashboard/init.js").init(app);
    require("./Modules/FriendNicknames/init.js").init(app);
}

// FIRES EVENT WHEN THE ENV IS UPDATED
fs.watchFile(__dirname+'/.env', () => {
    initializeControllers();
})

// SET MIDDLEWARE
// require('./Config/setMiddleware.js').setMiddlewareWithC(app);
// require('./Config/setMiddleware.js').setMiddleware(app);
require('./Config/setMiddleware.js').setMiddlewareWithCV2(app);
require('./Config/setMiddleware.js').setMiddlewareV2(app);

//CONFIGURE ENV FILE
require('dotenv').config();
// if (process.env.CANYONLICENSEKEY) {
    initializeControllers();
// }

if (!process.env.STORAGE_TYPE) {
    process.env.STORAGE_TYPE = "wasabi";
}


// SWAGGER CONFIGURATION

// COMMON CODE 

const { initSocket } = require("./socket/socketinit.js");
//FOR CHECK SERVER RUNNING OR NOT
app.get("/health", (req, res) => {
    res.send("Server is running in "+config.NODE_ENV);
});

fs.watch(__dirname + "/Modules/Template/", (event_type, file_name) => {
    try {
        delete require.cache[require.resolve(__dirname + "/Modules/Template/" + file_name)];;
    } catch (error) {
        console.error("ERROR in remove cache", error);
    }
});

// SERVER LISTEN PORT
const server = app.listen(config.PORT, () => {
    console.log("Server ready on "+config.PORT)
});
initSocket(server);