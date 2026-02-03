const { handleProfileGetForUser, handleTaskTypeImageGet } = require(`../../../common-storage/common-${process.env.STORAGE_TYPE}.js`);
const ctrl = require('./controller');
const { upload, validatePath } = require('./helpers/bucket.helper');

exports.init = (app) => {
    //Create Bucket Route
    app.post('/api/v1/createBucket', ctrl.createBucketOnStorage);
    //Update Bucket Route
    app.patch('/api/v1/updateBucket/:bucketId', ctrl.updateBucketOnStorage);
    //Get Bucket Route
    app.get('/api/v1/getBucket/:bucketId', ctrl.getBucketOnStorage);
    //Remove Bucket Route
    app.delete('/api/v1/removeBucket/:bucketId', ctrl.removeBucketOnStorage);
    //Get Bucket Size with bucket Id
    app.get('/api/v1/getBucketSize/:bucketId', ctrl.getBucketSizeOnStorage);

    //Create Bucket Route
    app.post('/api/v1/storage/uploadFile',upload.single("file"),validatePath, ctrl.uploadFileOnStorage);
    //Generate Signed or public url
    app.get('/api/v1/generateSignedUrl/:bucketId', ctrl.getSignedUrlFile);
    //Download File Route
    app.get('/api/v1/download/:bucketId/*', ctrl.handleFileRequest);
    //Remove file from storage]
    app.delete('/api/v1/storage/removeFile/:bucketId', ctrl.removeFileFromStorage);

    app.post("/api/v1/getUserProfile", handleProfileGetForUser);
    app.post("/api/v1/getTaskTypeImage", handleTaskTypeImageGet);
    app.post('/api/v1/storage/uploadFileBase64',ctrl.uploadBase64FileOnServerStorage);
}