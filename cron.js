const schedule = require("node-schedule");
const logger = require("./Config/loggerConfig");
const { handleBucketSizeUpdateCron } = require(`./common-storage/common-${process.env.STORAGE_TYPE}.js`);


// // This cron job executes daily at midnight (12 AM) and retrieves the file size from Wasabi storage
schedule.scheduleJob('0 0 * * *', async () => {
    logger.info(`Enter in schedule job`);
    handleBucketSizeUpdateCron();
})

// This cron job executes every 1 hour and Make Index for unIndex Task.
schedule.scheduleJob('0 * * * *', async () => {
    logger.info(`[Cron] createUnIndexTask`);
    taskIndexRef.createUnIndexTask();
})

// // This cron job executes daily at midnight (12 AM) and remove ai request count.
schedule.scheduleJob('0 0 * * *', async () => {
    aiRef.resetAiRequestCount();
})